<template>
  <div>
    <el-collapse v-if="users && users.length > 0" accordion v-model="activeName" @change="handleChange" class="admin-user-list">
      <el-collapse-item v-for="user in users" :name="user.id" :key="user.id"
        :class="{ 'admin': (user.role === 'admin'),
                  'moderator': (user.role === 'moderator'),
                  'guest': (user.role === 'guest') }"
      >
        <template slot="title">
          <i class="header-icon el-icon-user"></i>
          <span class="admin-user-header-login">{{ user.login }}</span>
          <span class="admin-user-header-role">{{ user.role}}</span>
          <div class="admin-user-header-created" v-if="user.registeredByAdmin">
            User created by admin:
            <i class="header-icon el-icon-medal"></i>
          </div>
        </template>
        <div>Email: {{ user.email }}</div>
        <div>Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
        <div>Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
      </el-collapse-item>
    </el-collapse>
    <div v-else-if="users && users.length=== 0">There are not users</div>
    <loader v-else></loader>
  </div>
</template>

<script>
import Loader from '~/components/Loader';
export default {
  components: { Loader },
    props: {
      "users": { type: Array, default: [] }
    },
    data() {
      return {
        activeName: '1',
         /*[
          { id: 1, login: "bob", email : "yahjkhlhlkhk@ukr.net" },
          { id: 2, login: "john", email : "hjkhkhktfghhj@ukr.net" },
          { id: 3, login: "Cat", email : "hhkjhlkjl@ukr.net" },
          { id: 4, login: "Baby", email : "yahluululu@ukr.net" }
        ]*/
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
  }
</script>

<style lang="scss">
%user-item-header{
  .header-icon{
    padding-left: 2%;
  }
  .admin-user-header-login{
    padding-left: 2%;
    display: inline-block;
    width: 20%;
  }
  .admin-user-header-role{
    padding: 0 1%;
    display: inline-block;
    width: 15%;
  }
  .admin-user-header-created{
    color:#ce3227;
    .header-icon{
      padding-left: 0;
      font-weight: bold;
    }
  }
}
.admin-user-list{
  width: 80%;
  margin: 2% auto 0;
}
.admin{
  .el-collapse-item__header{
    background-color:#d66eb7 !important;
    @extend %user-item-header;
  }
  .el-collapse-item__content{
    background-color: lighten(#d66eb7, 25%);
    padding: 2%;
  }
}
.moderator{
  .el-collapse-item__header{
    background-color:#afe78e !important;
    @extend %user-item-header;
  }
  .el-collapse-item__content{
    background-color: lighten(#afe78e, 15%);
    padding: 2%;
  }
}
.guest{
  .el-collapse-item__header{
    background-color:#eed89d !important;
    @extend %user-item-header;
  }
  .el-collapse-item__content{
    background-color: lighten(#eed89d, 10%);
    padding: 2%;
  }
}
</style>