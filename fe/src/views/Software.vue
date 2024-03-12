<template>
    <CRow>
        <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Cập nhật Phần mềm</strong>
          <CButton color="danger" style="margin-left: 80%;" @click="visible = true">
            Xóa thiết bị
          </CButton>          
        </CCardHeader>
        <br>
        <CCardBody v-if="software!=null">
            <CForm class="row g-3">
              <CRow class="mb-3">
              <CFormLabel for="tenphanmem" class="col-sm-2 col-form-label">
                Tên phần mềm
              </CFormLabel>
              <div class="col-sm-10">
                <CFormInput id="tenphanmem" type="text" v-model="software.ten" :value="software.ten"/>
              </div>
            </CRow>           
            <CRow class="mb-3">
              <CFormLabel for="model" class="col-sm-2 col-form-label">
                Model
              </CFormLabel>
              <div class="col-sm-10">
                <CFormInput id="model" type="text" v-model="software.model" :value="software.model"/>
              </div>
            </CRow>  
            <CRow class="mb-3">
              <CFormLabel for="ip" class="col-sm-2 col-form-label">
                IP
              </CFormLabel>
              <div class="col-sm-10">
                <CFormInput id="ip" type="text" v-model="software.ip" :value="software.ip"/>
              </div>
            </CRow>
            <CRow class="mb-3">
              <CFormLabel for="mucdich" class="col-sm-2 col-form-label">
                Muc dich
              </CFormLabel>
              <div class="col-sm-10">
                <CFormInput id="mucdich" type="text" v-model="software.mucdich" :value="software.mucdich"/>
              </div>
            </CRow>
            <CRow class="mb-3">
              <CFormLabel for="vitricaidat" class="col-sm-2 col-form-label">
                Vị trí cài đặt
              </CFormLabel>
              <div class="col-sm-10">
                <CFormInput id="vitricaidat" type="text" v-model="software.vitricaidat" :value="software.vitricaidat"/>
              </div>
            </CRow>
            <CRow class="mb-3">
              <CFormLabel for="hientrang" class="col-sm-2 col-form-label">
                Hien trang:
              </CFormLabel>
              <div class="col-sm-10">
                <CFormSelect v-model="hientrang" aria-label="Default select example">
                  <option :value="software.hientrang" selected disabled hidden>{{ software.hientrang }}</option>
                  <option value="Hoat dong">Hoat dong</option>
                  <option value="Khong hoat dong">Khong hoat dong</option>
                  <option value="Khac">Khac</option>
                </CFormSelect>
              </div>
              <div v-if="hientrang === 'Khac'">
                  <CFormLabel for="other" class="col-sm-2 col-form-label">
                    Chon khac:
                  </CFormLabel>
                  <CFormInput id="other" v-model="hientrangkhac" type="text" :value="software.hientrang"/>
              </div>              
            </CRow>
            <CRow class="mb-3">
              <CFormLabel for="quanli" class="col-sm-2 col-form-label">
                Bo phan quan li
              </CFormLabel>
              <div class="col-sm-10">
                <CFormInput id="quanli" type="text" v-model="software.quanli" :value="software.quanli"/>
              </div>
            </CRow>            
            <CRow class="mb-3">
              <CFormLabel for="duan" class="col-sm-2 col-form-label">
                Dự án
              </CFormLabel>
              <div class="col-sm-10">
                <CFormInput id="duan" type="text" v-model="software.duan" :value="software.duan"/>
              </div>
            </CRow>            
              <div class="col-auto">
                <CButton type="submit" color="info" class="mb-3" @click="updateSoftware(software.id)"> Confirm </CButton>
              </div>
            </CForm>
        </CCardBody>
      </CCard>
    </CCol>      
    </CRow>
    <CModal :backdrop="false" :keyboard="false" :visible="visible"
          @close="() => { visible = false }" >
      <CModalHeader>
        <CModalTitle>Xoá phần mềm</CModalTitle>
      </CModalHeader>
      <CModalBody>Bạn có chắc chắn muốn xóa phần mềm?</CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="() => { visible = false }">Đóng</CButton>
        <CButton color="danger" @click="deleteSoftware(software.id)">Xóa</CButton>
      </CModalFooter>
    </CModal>    
</template>

<script>
import axios from 'axios';

export default {
    name: 'Software',
    data() {
        return {
            software: null,
            hientrang: '',
            hientrangkhac: '',
            visible: false
        }
    },
    methods: {
        getSoftwareById(id) {
          axios.get(`http://127.0.0.1:3031/api/software/${id}`)
            .then(res => {
              console.log(res.data);
              this.software = res.data[0];
              this.hientrang = this.software.hientrang;
              console.log(this.software);
            }).catch(e => {
              console.log(e);
            })
        },
        updateSoftware(id) {
          // let ht=this.hientrang;
          console.log('update:--', this.hientrangkhac);
          if(this.hientrang==='Khac'){
            this.software.hientrang=this.hientrangkhac;
          }
          console.log(this.software);
            axios.put(`http://127.0.0.1:3031/api/software/${id}`,this.software)
                .then(res => {
                console.log(res.data);
                this.getSoftwareById(id);
            }).catch(e => {
                console.log(e);
            });
        },
        deleteSoftware(id) {
          axios.put(`http://127.0.0.1:3031/api/software/deleteSoftware/${id}`)
            .then(res =>{
              res;
              this.$router.push({path:`/dashboard`});            
            }).catch(e => {
              console.log(e);
            });
        },
        returnHome() {
            this.$router.push({path:`/dashboard`});            
        }        
    },
    mounted() {
        this.getSoftwareById(this.$route.params.id);
    }
}
</script>