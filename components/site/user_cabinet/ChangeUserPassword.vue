<template>
  <div class="userPassword">
    <el-divider content-position="left">User Password</el-divider>
    <h3 class="userPassword__header">Here you can change your user Password</h3>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="userPasswordValidate" label-width="170px" class="demo-ruleForm">
        <el-form-item label="Working password" prop="wpass">
            <el-input type="password" v-model="ruleForm.wpass" autocomplete="off" class="userPassword__input"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off" class="userPassword__input"></el-input>
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" class="userPassword__input"></el-input>
        </el-form-item>
        <el-form-item class="userPassword__buttons">
            <el-button type="primary" @click="submitUserPassword('userPasswordValidate')">Change user password</el-button>
            <el-button @click="resetUserPassword('userPasswordValidate')">Reset</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.userPasswordValidate.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password again'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('Two inputs don\'t match!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          wpass: '',
          pass: '',
          checkPass: ''
        },
        rules: {
          //wpass - working pass
          wpass: [
            { validator: validatePass, trigger: 'blur' },
            { min: 5, max: 12, message: 'Length must be from 5 to 12', trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' },
            { min: 5, max: 12, message: 'Length must be from 5 to 12', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitUserPassword(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            const userData = {
              workPass: this.ruleForm.wpass,
              pass: this.ruleForm.pass,
              confirmedPass: this.ruleForm.checkPass
            };
            try{
              const response = await this.$axios.put('/api/cabinet/user-password', userData);
              if((response.status === 200) && response.data.passwordChanged){
                this.$message({
                  showClose: true,
                  message: 'Your password has been successfully changed',
                  type: 'success'
                });
                this.resetUserPassword(formName);
              }else{
                //if data is unexpactible
                console.log("Test ",response.response);
                //this.&store.comit('error/setError', response.response.data.message, {root: true});

              }
            }catch(e){
              console.log("Test ",e);
              this.$store.comit('error/setError', e, {root: true});
            }
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
      },
      resetUserPassword(formName) {
        this.$refs[formName].resetFields();
        //console.log("submit! ", formName);
      }
    }
}
</script>

<style lang="scss" scoped>
.userPassword{
      background-color: #d6b1c9;
  }
  .userPassword__header{
    text-align: center;
    margin-bottom: .5em;
  }
  .userPassword__input{
    width: 50%;
  }
  .userPassword__buttons{
      button:first-child{
        background-color: #df7cc1;
      }
      button{
        background-color: #f0c2db;
        color: black;
        padding: 8px;
        font-size: 13px;
        &:hover, &:active{
          color: #fff;
        }
      }
  }
</style>