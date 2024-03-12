<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Cập nhật Thiết bị</strong>
          <CButton color="danger" style="margin-left: 80%;" @click="visible = true">
            Xóa thiết bị
          </CButton>
        </CCardHeader>
        <br>
        <CCardBody>
          <CForm class="row g-3" v-if="device != null">
            <CRow class="mb-3">
              <CFormLabel for="loaithietbi" class="col-sm-2 col-form-label">
                Loại thiết bi
              </CFormLabel>
              <div class="col-sm-10">
                <CFormInput id="loaithietbi" type="text" v-model="device.loaithietbi" :value="device.loaithietbi" />
              </div>
            </CRow>
            <CRow class="mb-3">
              <CFormLabel for="tenthietbi" class="col-sm-2 col-form-label">
                Tên thiết bi
              </CFormLabel>
              <div class="col-sm-10">
                <CFormInput id="tenthietbi" type="text" v-model="device.ten" :value="device.ten" />
              </div>
            </CRow>
            <CRow class="mb-3">
              <CFormLabel for="model" class="col-sm-2 col-form-label">
                Model
              </CFormLabel>
              <div class="col-sm-10">
                <CFormInput id="model" type="text" v-model="device.model" :value="device.model" />
              </div>
            </CRow>
            <CRow class="mb-3">
              <CFormLabel for="serial" class="col-sm-2 col-form-label">
                Serial
              </CFormLabel>
              <div class="col-sm-10">
                <CFormInput id="serial" type="text" v-model="device.serial" :value="device.serial" />
              </div>
            </CRow>
            <CRow class="mb-3">
              <CFormLabel for="cauhinh" class="col-sm-2 col-form-label">
                Cau hinh
              </CFormLabel>
              <div class="col-sm-10">
                <CFormInput id="cauhinh" type="text" v-model="device.cauhinh" :value="device.cauhinh" />
              </div>
            </CRow>
            <CRow class="mb-3">
              <CFormLabel for="ip" class="col-sm-2 col-form-label">
                IP
              </CFormLabel>
              <div class="col-sm-10">
                <CFormInput id="ip" type="text" v-model="device.ip" :value="device.ip" />
              </div>
            </CRow>
            <CRow class="mb-3">
              <CFormLabel for="quanli" class="col-sm-2 col-form-label">
                Bo phan quan li
              </CFormLabel>
              <div class="col-sm-10">
                <CFormInput id="quanli" type="text" v-model="device.quanli" :value="device.quanli" />
              </div>
            </CRow>
            <CRow class="mb-3">
              <CFormLabel for="mucdich" class="col-sm-2 col-form-label">
                Muc dich
              </CFormLabel>
              <div class="col-sm-10">
                <CFormInput id="mucdich" type="text" v-model="device.mucdich" :value="device.mucdich" />
              </div>
            </CRow>
            <CRow class="mb-3">
              <CFormLabel for="hientrang" class="col-sm-2 col-form-label">
                Hien trang:
              </CFormLabel>
              <div class="col-sm-10">
                <CFormSelect v-model="hientrang" aria-label="Default select example">
                  <option :value="device.hientrang" selected disabled hidden>{{ device.hientrang }}</option>
                  <option value="Hoat dong">Hoat dong</option>
                  <option value="Khong hoat dong">Khong hoat dong</option>
                  <option value="Khac">Khac</option>
                </CFormSelect>
              </div>
              <div v-if="hientrang === 'Khac'">
                <CFormLabel for="other" class="col-sm-2 col-form-label">
                  Chon khac:
                </CFormLabel>
                <CFormInput id="other" v-model="hientrangkhac" type="text" :value="device.hientrang" />
              </div>
            </CRow>
            <CRow class="mb-3">
              <CFormLabel for="lichsu" class="col-sm-2 col-form-label">
                Lich su
              </CFormLabel>
              <div class="col-sm-10">
                <CFormInput id="lichsu" type="text" v-model="device.lichsu" :value="device.lichsu" />
              </div>
            </CRow>
            <CRow class="mb-3">
              <CFormLabel for="ghichu" class="col-sm-2 col-form-label">
                Ghi chu
              </CFormLabel>
              <div class="col-sm-10">
                <CFormInput id="ghichu" type="text" v-model="device.ghichu" :value="device.ghichu" />
              </div>
            </CRow>
            <div class="col-auto">
              <CButton type="submit" color="info" class="mb-3" @click="updateDevice(device.id)"> Confirm </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <CModal :backdrop="false" :keyboard="false" :visible="visible"
          @close="() => { visible = false }" >
    <CModalHeader>
      <CModalTitle>Xoá thiết bị</CModalTitle>
    </CModalHeader>
    <CModalBody>Bạn có chắc chắn muốn xóa thiết bị?</CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { visible = false }">Đóng</CButton>
      <CButton color="danger" @click="deleteDevice(device.id)">Xóa</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Device',
  data() {
    return {
      device: null,
      hientrang: '',
      hientrangkhac: '',
      visible: false,
    }
  },
  // watched: {
  //   changeTxt(){
  //     var select = document.getElementById("hientrang");  
  //     var otherOption = document.getElementById("other-option");
  //     // select.addEventListener("change", function() {
  //     if (select.value === "other") {
  //       otherOption.style.display = "block";
  //     } else {
  //       otherOption.style.display = "none";
  //     }
  //   // });
  //   }
  // },
  methods: {
    getDeviceById(id) {
      axios.get(`http://127.0.0.1:3031/api/device/${id}`)
        .then(res => {
          console.log(res.data);
          this.device = res.data[0];
          this.hientrang = this.device.hientrang;
          console.log(this.device);
        }).catch(e => {
          console.log(e);
        })
    },
    updateDevice(id) {
      // let ht=this.hientrang;
      console.log('update:--', this.hientrangkhac);
      if (this.hientrang === 'Khac') {
        this.device.hientrang = this.hientrangkhac;
      }
      console.log(this.device);
      // let d= {
      //   ten:this.device.ten,
      //   model:this.device.model,
      //   serial:this.device.serial,
      //   cauhinh:this.device.cauhinh,
      //   ip:this.device.ip,
      //   quanli:this.device.quanli,
      //   mucdich:this.device.mucdich,
      //   hientrang:ht,
      //   loaithietbi:this.device.loaithietbi,
      //   lichsu:this.device.lichsu,
      //   ghichu:this.device.ghichu
      // }
      axios.put(`http://127.0.0.1:3031/api/device/${id}`, this.device)
        .then(res => {
          console.log(res.data);
          this.getDeviceById(id);
        }).catch(e => {
          console.log(e);
        });
    },
    deleteDevice(id) {
      console.log(id);
      axios.put(`http://127.0.0.1:3031/api/device/deleteDevice/${id}`)
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
    if (this.$route.params.id != null) {
      this.getDeviceById(this.$route.params.id);
    }
  }
}
</script>