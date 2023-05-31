<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>Thêm Thiết bị</strong>
                </CCardHeader>
                <br>
                <CNav variant="tabs">
                    <CNavLink @click="change = false" :class="{active: change==false}">Phần cứng</CNavLink>
                    <CNavLink @click="change = true" :class="{active: change==true}">Phần mềm</CNavLink>
                </CNav>
                <CCardBody>
                    <CForm v-if="change==false" class="row g-3">
                        <CRow class="mb-3">
                            <CFormLabel for="loaithietbi" class="col-sm-2 col-form-label">
                                Loại thiết bi
                            </CFormLabel>
                            <div class="col-sm-10">
                                <CFormInput id="loaithietbi" type="text" v-model="device.loaithietbi" />
                            </div>
                        </CRow>
                        <CRow class="mb-3">
                            <CFormLabel for="tenthietbi" class="col-sm-2 col-form-label">
                                Tên thiết bi
                            </CFormLabel>
                            <div class="col-sm-10">
                                <CFormInput id="tenthietbi" type="text" v-model="device.ten" />
                            </div>
                        </CRow>
                        <CRow class="mb-3">
                            <CFormLabel for="model" class="col-sm-2 col-form-label">
                                Model
                            </CFormLabel>
                            <div class="col-sm-10">
                                <CFormInput id="model" type="text" v-model="device.model" />
                            </div>
                        </CRow>
                        <CRow class="mb-3">
                            <CFormLabel for="serial" class="col-sm-2 col-form-label">
                                Serial
                            </CFormLabel>
                            <div class="col-sm-10">
                                <CFormInput id="serial" type="text" v-model="device.serial" />
                            </div>
                        </CRow>
                        <CRow class="mb-3">
                            <CFormLabel for="cauhinh" class="col-sm-2 col-form-label">
                                Cau hinh
                            </CFormLabel>
                            <div class="col-sm-10">
                                <CFormInput id="cauhinh" type="text" v-model="device.cauhinh" />
                            </div>
                        </CRow>
                        <CRow class="mb-3">
                            <CFormLabel for="ip" class="col-sm-2 col-form-label">
                                IP
                            </CFormLabel>
                            <div class="col-sm-10">
                                <CFormInput id="ip" type="text" v-model="device.ip" />
                            </div>
                        </CRow>
                        <CRow class="mb-3">
                            <CFormLabel for="quanli" class="col-sm-2 col-form-label">
                                Bo phan quan li
                            </CFormLabel>
                            <div class="col-sm-10">
                                <CFormInput id="quanli" type="text" v-model="device.quanli" />
                            </div>
                        </CRow>
                        <CRow class="mb-3">
                            <CFormLabel for="mucdich" class="col-sm-2 col-form-label">
                                Muc dich
                            </CFormLabel>
                            <div class="col-sm-10">
                                <CFormInput id="mucdich" type="text" v-model="device.mucdich" />
                            </div>
                        </CRow>
                        <CRow class="mb-3">
                            <CFormLabel for="hientrang" class="col-sm-2 col-form-label">
                                Hien trang:
                            </CFormLabel>
                            <div class="col-sm-10">
                                <CFormSelect v-model="hientrang" aria-label="Default select example">
                                    <option value="Hoat dong" selected>Hoat dong</option>
                                    <option value="Khong hoat dong">Khong hoat dong</option>
                                    <option value="Khac">Khac</option>
                                </CFormSelect>
                            </div>
                            <div v-if="hientrang === 'Khac'">
                                <CFormLabel for="other" class="col-sm-2 col-form-label">
                                    Chon khac:
                                </CFormLabel>
                                <CFormInput id="other" v-model="hientrangkhac" type="text" />
                            </div>
                        </CRow>
                        <CRow class="mb-3">
                            <CFormLabel for="lichsu" class="col-sm-2 col-form-label">
                                Lich su
                            </CFormLabel>
                            <div class="col-sm-10">
                                <CFormInput id="lichsu" type="text" v-model="device.lichsu" />
                            </div>
                        </CRow>
                        <CRow class="mb-3">
                            <CFormLabel for="ghichu" class="col-sm-2 col-form-label">
                                Ghi chu
                            </CFormLabel>
                            <div class="col-sm-10">
                                <CFormInput id="ghichu" type="text" v-model="device.ghichu" />
                            </div>
                        </CRow>
                        <div class="col-auto">
                            <CButton type="submit" color="info" class="mb-3" @click="addDevice(device)"> Confirm
                            </CButton>
                        </div>
                    </CForm>
                    <CForm v-else-if="change==true" class="row g-3">
                        <CRow class="mb-3">
                            <CFormLabel for="tenphanmem" class="col-sm-2 col-form-label">
                                Tên phần mềm
                            </CFormLabel>
                            <div class="col-sm-10">
                                <CFormInput id="tenphanmem" type="text" v-model="software.ten"  />
                            </div>
                        </CRow>
                        <CRow class="mb-3">
                            <CFormLabel for="model" class="col-sm-2 col-form-label">
                                Model
                            </CFormLabel>
                            <div class="col-sm-10">
                                <CFormInput id="model" type="text" v-model="software.model" />
                            </div>
                        </CRow>
                        <CRow class="mb-3">
                            <CFormLabel for="ip" class="col-sm-2 col-form-label">
                                IP
                            </CFormLabel>
                            <div class="col-sm-10">
                                <CFormInput id="ip" type="text" v-model="software.ip" />
                            </div>
                        </CRow>
                        <CRow class="mb-3">
                            <CFormLabel for="mucdich" class="col-sm-2 col-form-label">
                                Muc dich
                            </CFormLabel>
                            <div class="col-sm-10">
                                <CFormInput id="mucdich" type="text" v-model="software.mucdich"  />
                            </div>
                        </CRow>
                        <CRow class="mb-3">
                            <CFormLabel for="vitricaidat" class="col-sm-2 col-form-label">
                                Vị trí cài đặt
                            </CFormLabel>
                            <div class="col-sm-10">
                                <CFormInput id="vitricaidat" type="text" v-model="software.vitricaidat"/>
                            </div>
                        </CRow>
                        <CRow class="mb-3">
                            <CFormLabel for="hientrang" class="col-sm-2 col-form-label">
                                Hien trang:
                            </CFormLabel>
                            <div class="col-sm-10">
                                <CFormSelect v-model="hientrang2" aria-label="Default select example">
                                    <option value="Hoat dong" selected>Hoat dong</option>
                                    <option value="Khong hoat dong">Khong hoat dong</option>
                                    <option value="Khac">Khac</option>
                                </CFormSelect>
                            </div>
                            <div v-if="hientrang2 === 'Khac'">
                                <CFormLabel for="other" class="col-sm-2 col-form-label">
                                    Chon khac:
                                </CFormLabel>
                                <CFormInput id="other" v-model="hientrangkhac2" type="text" />
                            </div>
                        </CRow>
                        <CRow class="mb-3">
                            <CFormLabel for="quanli" class="col-sm-2 col-form-label">
                                Bo phan quan li
                            </CFormLabel>
                            <div class="col-sm-10">
                                <CFormInput id="quanli" type="text" v-model="software.quanli" />
                            </div>
                        </CRow>
                        <CRow class="mb-3">
                            <CFormLabel for="duan" class="col-sm-2 col-form-label">
                                Dự án
                            </CFormLabel>
                            <div class="col-sm-10">
                                <CFormInput id="duan" type="text" v-model="software.duan" />
                            </div>
                        </CRow>
                        <div class="col-auto">
                            <CButton type="submit" color="info" class="mb-3" @click="addSoftware(software)"> Confirm
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
                <CButton color="secondary" @click="returnHome">
                        Quay lại
                </CButton>
            </CCard>
        </CCol>
    </CRow>
</template>
<script>
import axios from 'axios';
export default {
    name: 'New',
    data() {
        return {
            change: false,
            device: {
                ten: '',
                model: '',
                serial: '',
                cauhinh: '',
                ip: '',
                quanli: '',
                mucdich: '',
                hientrang: '',
                loaithietbi: '',
                lichsu: '',
                ghichu: ''
            },
            software: {
                ten: '',
                model: '',
                ip: '',
                mucdich: '',
                vitricaidat: '',
                hientrang: '',
                quanli: '',
                duan: ''
            },
            hientrang: '',
            hientrangkhac: '',
            hientrang2: '',
            hientrangkhac2: '',
        }
    },
    methods: {
        addDevice(dv) {
            if (this.hientrang === 'Khac') {
                dv.hientrang = this.hientrangkhac;
            }
            console.log(dv);
            axios.post("http://localhost:3031/api/device/addDevice", dv)
                .then(res => {
                    res;
            alert('Đã thêm:',dv.ten);
                }).catch(e => {
                    alert(e);
                });
        },
        addSoftware(sw) {
            if (this.hientrang2 === 'Khac') {
                sw.hientrang = this.hientrangkhac2;
            }
            axios.post("http://localhost:3031/api/software/addSoftware",sw)
                .then(res => {
                    res;
                    alert('Đã thêm:',sw.ten);
                }).catch(e => {
                    alert(e);
                });           
        },
        returnHome() {
            this.$router.push({path:`/dashboard`});            
        }

    }
}
</script>