<template>
  <div class="bg min-vh-100 d-flex flex-row align-items-center">
    <CContainer >
      <CRow class="justify-content-center">
        <CCol :md="6">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm class="center">
                  <h1> Hệ thống quản lý tài sản <span style="color:blue">VNCERT</span><span style="color:red">/CC</span></h1>
                  <p class="text-medium-emphasis"></p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autocomplete="username"
                      name="username"
                      v-model="user.username"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                      name="password"
                      v-model="user.password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="12" class="text-right">
                      <CButton @click="handleLogin" color="primary" class="px-4"> Đăng nhập </CButton>
                    </CCol>
                    <!-- <CCol :xs="4" class="text-right">
                      <CButton color="link" class="px-2">
                        Forgot password?
                      </CButton>
                    </CCol> -->
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import AuthService from '../../services/service'
export default {
  name: 'Login',
  data(){
    return {
      user: {
        username: '',
        password: '',
      }
    }
  },
  computed: {
    loggedIn(){
      console.log('login',this.$store.state.auth.status.loggedIn);
      if(this.$store.state.auth.user !=null){
      console.log('userlogn:',this.$store.state.auth.user.username);
      }else{
        console.log('null');
      }
      return this.$store.state.auth.status.loggedIn;
    },
  
  },
  created(){
    if(this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    handleLogin() {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
              // this.$store.dispatch("auth/checkRole", 'ADMIN');
            this.$router.push("/dashboard");
          },
          (error) => {
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          }
        );
      },
  },
  mounted() {
    this.user= {
        username: '',
        password: '',
      }
  }
};
</script>
<style>
.bg {
  background-image: url('../../assets/images/bg.png');
}
</style>
