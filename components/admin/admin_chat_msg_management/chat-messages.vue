<template>
  <div>
    <el-table
      :data="portionMessages"
    >
      <el-table-column
        prop="userName"
        label="User name"
        width="150">
      </el-table-column>
      <el-table-column label="Title" width="150" v-if="!hideTitleColumn">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="text"
        label="Chat message text"
        min-width="300"
      >
      </el-table-column>
      <el-table-column label="Date" width="150">
        <template slot-scope="scope">
          <span v-date="scope.row.date" class="message-date"></span>
        </template>
      </el-table-column>
      <el-table-column label="Delete it" width="100">
        <template slot-scope="scope">
          <el-button
            type="danger"
            plain
            size="mini"
            @click="deleteMessage(roomId, scope.row.id)">Del</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-if="!displayPagination"
      :messages="allMessages"
      :limit="limit"
      :goForward="goForward"
      :goBack="goBack"
      :updateLimit="updateLimit"
      v-on:onGoToTheStart="goToTheStart"
      @onGoToTheEnd="goToTheEnd"
      :getCurrentPage="getCurrentPage"
      :updatedModels="updatedModels"
    />
  </div>
</template>

<script>
import pagination from './pagination.vue';
export default {
  components: { pagination },
  props:{
    roomId: { type: String },
    messages: { type: Array },
    deleteChosenMessage: { type: Function }
  },
  data(){
    return {
      //Prop into Model
      allMessages: this.messages,
      portionMessages: [],
      hideTitleColumn: true,
      limit: 5,
      displayPagination: false,
      currentPage: 1,
      updatedModels: null
    }
  },
  methods:{
    deleteMessage(roomId, messageId){
      //Update 'messages' in parent component
      this.deleteChosenMessage(roomId, messageId);

      //Data if only one page exists
      if(this.allMessages.length <= this.limit){
        let startPageIndex = 0;
        let endPageIndex = startPageIndex + this.limit;
        //Delete from all list
          this.allMessages = this.allMessages.filter( msg =>{
            return msg.id !== messageId;
          });
        //
        if(this.portionMessages.length === 1){
          this.portionMessages = this.allMessages.slice(startPageIndex, endPageIndex);
          //console.log("Pages 1 ",startPageIndex," ",endPageIndex);
          //console.log("Current page 1-1 ",this.currentPage," Message on the page must be one ",this.portionMessages.length);
        }else{
          //startPageIndex = page * this.limit - this.limit;
          //endPageIndex = startPageIndex + this.limit;
          this.portionMessages = this.allMessages.slice(startPageIndex, endPageIndex);
          //console.log("Current page 1-2 ",this.currentPage," Messages on the page ",this.portionMessages.length);
        }
      }else{
        //One message left in the portion list
        if(this.portionMessages.length === 1){
          this.currentPage -= 1;
          //Delete from all list
          this.allMessages = this.allMessages.filter( msg =>{
            return msg.id !== messageId;
          });
          let startPageIndex = this.currentPage * this.limit - this.limit;
          let endPageIndex = startPageIndex + this.limit;
          this.portionMessages = this.allMessages.slice(startPageIndex, endPageIndex);
          //console.log("Current page 2-1 ",this.currentPage," Message on the page must be one ",this.portionMessages.length);
        }else{
          //Delete from all list
          this.allMessages = this.allMessages.filter( msg =>{
            return msg.id !== messageId;
          });
          let startPageIndex = this.currentPage * this.limit - this.limit;
          let endPageIndex = startPageIndex + this.limit;
          this.portionMessages = this.allMessages.slice(startPageIndex, endPageIndex);
          //console.log("Current page 2-2 ",this.currentPage," Messages on the page ",this.portionMessages.length);
        }

      }
      //Remove message from DB
      //this.$forceUpdate();
      //this.$eventBus.$emit('updatePagination', {
      /*this.$nuxt.$emit('update-pagination', {
        updatedCurrentPage: this.currentPage,
        updatedTotalPages: Math.ceil(this.allMessages.length / this.limit)
      });*/
      this.updatedModels = {
        updatedCurrentPage: this.currentPage,
        updatedTotalPages: Math.ceil(this.allMessages.length / this.limit)
      };
    },
    goForward(nextPageIndex){
      //Grab the first few according to the 'limit' to display on the first page
      let endPageIndex = nextPageIndex + this.limit;
      //console.log("F ",nextPageIndex," ",endPageIndex);
      this.portionMessages = this.allMessages.slice(nextPageIndex, endPageIndex);
    },
    goBack(prevPageIndex){
      //Grab the first few according to the 'limit' to display on the first page
      let endPageIndex = prevPageIndex + this.limit;
      //console.log("B ",prevPageIndex," ",endPageIndex);
      this.portionMessages = this.allMessages.slice(prevPageIndex, endPageIndex);
    },
    updateLimit(updatedLimit){
      this.limit = updatedLimit;
      //Reset portion messages to the first page
      this.portionMessages = this.allMessages.slice(0, this.limit);
    },
    goToTheStart(prevPageIndex){
      //Set portion messages as the first page
      this.portionMessages = this.allMessages.slice(prevPageIndex, this.limit);
    },
    goToTheEnd(prevPageIndex){
      //Set portion messages as the last page
      this.portionMessages = this.allMessages.slice(prevPageIndex);
    },
    getCurrentPage(currentPage){
      this.currentPage = currentPage;
      this.$emit('onCurrentPage', { roomId: this.roomId, currentPage });
    },
    messagesInit(){
      //Copy prop to the local model
      //this.allMessages = this.messages;
      let total = this.allMessages.length;
      //Hide pagination if 'total' less than 'limit'
      if(total <= this.limit){
        this.displayPagination = true;
      }//Pagination will be shown.
      //Grab the first few according to the 'limit' to display on the first page
      this.portionMessages = this.allMessages.slice(0, this.limit);
      // Should display 'title' column
      if(this.portionMessages[0]?.title) this.hideTitleColumn = false;
    }
  },
  mounted(){
    this.messagesInit();
    //console.log("All ",this.allMessages);
  }
}
</script>

<style lang="scss" scoped>
.message-date{
  font-size: .8em;
}
</style>
