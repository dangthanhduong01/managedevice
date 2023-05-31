<template>
    <div>
        <CRow>
            <CCol :md="12">
                <CCard class="mb-4">
                    <CCardHeader> Quản lí Phần mềm </CCardHeader>
                    <CCardBody>
                        <CTable align="middle" class="mb-0 border" hover responsive>
                            <CTableHead color="light">
                                <CTableRow>
                                    <CTableHeaderCell class="text-center">Tên phần mềm</CTableHeaderCell>
                                    <CTableHeaderCell>Model</CTableHeaderCell>
                                    <CTableHeaderCell>IP</CTableHeaderCell>
                                    <CTableHeaderCell class="text-center">Mục đích sử dụng</CTableHeaderCell>
                                    <CTableHeaderCell>Vị trí cài đặt</CTableHeaderCell>
                                    <CTableHeaderCell>Hiện trạng</CTableHeaderCell>
                                    <CTableHeaderCell>Quản lí</CTableHeaderCell>
                                    <CTableHeaderCell>Dự án</CTableHeaderCell>
                                    <CTableHeaderCell>Thao tác</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow v-for="s in softwares" :key="s.ten">
                                    <CTableDataCell class="text-center">
                                        {{ s.ten }}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {{ s.model }}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {{ s.ip }}
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        {{ s.mucdich }}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {{ s.vitricaidat }}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {{ s.hientrang }}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {{ s.quanli }}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {{ s.duan }}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CButton color="info"><router-link style="text-decoration: none;color: aliceblue;"
                                                :to="'/software/' + s.id">Sửa</router-link></CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
    <CModal alignment="center" :visible="visibleHistory" @close="() => { visibleHistory = false }">
        <CModalHeader>
            <CModalTitle>Lịch sử sử dụng</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CTable hover>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Xóa</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    <CTableRow v-for="l in historyofDevice" :key="l.id">
                        <div v-if="editHistory != l.id">
                            <CTableDataCell>{{ l.chitiet }}</CTableDataCell>
                        </div>
                        <div v-else>
                            <CTableDataCell>
                                <CInputGroup class="mb-3">
                                    <CFormInput placeholder="Edit history" v-model="editTextHistory"
                                        aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    <CButton type="button" @click="updateHistory" color="info" variant="outline"
                                        id="button-addon2">Button</CButton>
                                </CInputGroup>
                            </CTableDataCell>
                        </div>
                        <CTableDataCell>
                            <CIcon @click="changeHistory(l.id)" icon="cilList" size="xl" />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CCloseButton style="" black />
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell colspan="2">
                            <CFormInput v-model="newHistory" id="autoSizingInput" placeholder="Them lich su" />
                        </CTableDataCell>
                        <CTableDataCell xs="auto">
                            <CButton color="info" type="submit" @click="addHistory(currentHistoryOfDevice)">Thêm</CButton>
                        </CTableDataCell>
                    </CTableRow>
                </CTableBody>
            </CTable>
        </CModalBody>
        <CModalFooter>
            <CButton color="secondary" @click="() => { visibleHistory = false }">
                Close
            </CButton>
            <CButton color="primary">Save changes</CButton>
        </CModalFooter>
    </CModal>
</template>
<script>
import axios from 'axios';
export default {
    name: 'ManageSoftware',
    data() {
        return {
            visibleHistory: false,
            softwares: null,
            historyofDevice: null,
            currentHistoryOfDevice: null,
            newHistory: '',
            editHistory: null,
            editTextHistory: '',
        };
    },
    computed: {},
    methods: {
        getAllSoftware() {
            axios.get(`http://localhost:3031/api/software`)
                .then(res => {
                this.softwares = res.data;
                console.log(this.softwares);
            }).catch(e => {
                console.log(e);
            });
        },
        seeAllHistory(id) {
          axios.get(`http://localhost:3031/api/allHistoryofDevice/${id}`)
          .then(res => {
            this.historyofDevice=res.data;
            this.currentHistoryOfDevice=id;
          }).catch(e=>{
            console.log(e);
          });
        },
        updateHistory(){
          console.log(this.editHistory,this.editTextHistory);
        },
        changeHistory(id){
          if(this.editHistory !=id){
            this.editHistory=id;
          }else{
            this.editHistory = null;
          }
          this.editTextHistory='';
        },
        addHistory(id){
          console.log(id);
          let data= {
            chitiet: this.newHistory,
            id_device: this.currentHistoryOfDevice
          }
          axios.post("http://localhost:3031/api/addHistory",data)
          .then(res => {
            this.newHistory = '';
            alert(res.data);
          }).catch(e =>{
            alert(e);
          });
        }        
    },
    mounted() {
        this.getAllSoftware();
        this.historyofDevice = null;
        this.currentHistoryOfDevice=null;
        this.newHistory = '';
        this.editHistory = null;
        this.editTextHistory= '';
    },
}
</script>