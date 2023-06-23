<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <CIcon :icon="logo" height="48" alt="Logo" />
      </CHeaderBrand>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <!-- <CNavItem>
          <CNavLink href="/dashboard"> Dashboard </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="/#/allProject">Dự án</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="/#/allDevice">Thiết bị</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="/#/allSoftware">Phần mềm</CNavLink>
        </CNavItem>         -->
      </CHeaderNav>
      <CHeaderNav>
        <div v-if="currentUser">
          <CDropdown variant="nav-item">
            <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
              <CAvatar :src="avatar" size="md" />
            </CDropdownToggle>
            <CDropdownMenu class="pt-0">
              <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
                Account
              </CDropdownHeader>
              <CDropdownItem>
                <CButton>
                 <CIcon icon="cil-user" /> Profile 
                </CButton>
              </CDropdownItem>
              <CDropdownItem>
                <CButton @click.prevent="logOut"> 
                  <CIcon icon="cil-lock-locked" /> Logout
                </CButton> 
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </div>
        <div v-else>
          <CButton>
            <CNavLink href="/#/login">Đăng nhập</CNavLink>
          </CButton>
        </div>
      </CHeaderNav>
    </CContainer>
    <CHeaderDivider />
    <CContainer fluid>
      <AppBreadcrumb />
    </CContainer>
  </CHeader>
</template>

<script>
import AppBreadcrumb from './AppBreadcrumb.vue'
import avatar from '@/assets/images/avatars/8.jpg'
// import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt.vue'
import { logo } from '@/assets/brand/logo'
export default {
  name: 'AppHeader',
  components: {
    AppBreadcrumb,
},
  setup() {
    return {
      avatar: avatar,
      logo,
      itemsCount: 42,
    }
  },
  computed: {
    currentUser() {
        return this.$store.state.auth.user;
      },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script>
