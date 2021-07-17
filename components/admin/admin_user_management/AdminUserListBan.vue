<template>
  <div class="user-ban">
    <slot name="header"></slot>
    <el-radio-group v-model="banState" @change="userState">
      <el-radio :label="false" :class="!banState ? 'user-ban-on' : 'user-ban-default'">
        User unlocked
      </el-radio>
      <el-radio :label="true" :class="banState ? 'user-ban-off' : 'user-ban-default'">
        User banned
      </el-radio>
    </el-radio-group>
    <div class="shadow" v-if="sendingStatus">
      <loader class="shadow__loader" />
    </div>
  </div>    
</template>

<script>
import Loader from './../../Loader';
import { mapMutations } from 'vuex';
export default {
  components: { Loader },
  props: {
    "apiPart": { typa: String, default: '' },
    "userId": { type: String, default: '' },
    "ban": { type: Boolean, default: false }
  },
  data () {
    return {
      banState: false,
      sendingStatus: false,
      errorStateStr: false
    };
  },
  methods: {
    ...mapMutations('error',['setError']),
    async userState(state){
      this.sendingStatus = true;
      //setTimeout(()=>{
      try{
        const userData = {};
        // this.apiPart - 'blog' | 'chat'
        userData[this.apiPart] = state; // userData.blog = true | false;
        userData['userId'] = this.userId; // userData.userId = fhjfhjjfj;
        // Send user data to API
        const result = await this.$axios.post(`/api/auth/admin/user/ban/${this.apiPart}`,userData);
        if(result && result.data.message){
          this.$message({
            showClose: true,
            message: `${result.data.message}`,
            type: 'success'
          });
          // Create 'Socket' event 'userChatBan' to unconnect the user
          if(this.banState && (this.apiPart === 'chat')){
            // Prepare user's data
              const userData = { id: result.data.result.id, banState: this.banState };
              // Send data by socket to the server to get an unique ID of the user connection
            this.$socket.emit('userChatBan', userData, (data) => {
              // Server response if request was bad
              if (typeof data === 'string'){
                //console.error(data);
              } else{
                // Good response
                //console.log("Good response ",data);
              }
            })
          }
          return;
        }
        // Return state of the radio button back if API falls
        this.banState = !state;
      }catch(e){
        //console.log("Error ",e);
        let errorStr = state ? 'User cannot be banned!' : 'User cannot be unlocked';
        if(this.errorStateStr){
          errorStr = errorStr;
          this.errorStateStr = !this.errorStateStr;
        }else{
          errorStr = errorStr+" ";
          this.errorStateStr = !this.errorStateStr;
        }
        // This is a Mutation, call it and pass the error
        this.setError(errorStr);
        // Return state of the radio button back if API falls
        this.banState = !state;
      }finally{
        this.sendingStatus = false;
      }
      //},3000);
    }
  },
  created(){
    // Rewrite 'props' value into 'data' value
    this.banState = this.ban;
  }
}
</script>

<style lang="scss">
.user-ban{
  position: relative;
  @mixin radio_style($bordCol,$bgCol,$color){
    .el-radio__inner{
      border-color: $bordCol;
      background: $bgCol;
    }
    .el-radio__input.is-checked+.el-radio__label{
      color: $color;
    }
  }
  .user-ban-default{
    @include radio_style(#908f8f,#afadad,#000);
  }
  .user-ban-on{
    @include radio_style(#07b842,#35da7a,#07b842);
  }
  .user-ban-off{
    @include radio_style(#bb1c17,#c04242,#bb1c17);
  }
}
.shadow{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffffb3;
  .shadow__loader{
    margin: -1% auto;
    transform: scale(0.5);
  }
}
</style>