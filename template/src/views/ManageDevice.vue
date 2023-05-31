<template>
    <p></p>
<Row>
    <CCard class="mb-4">
        <CCardHeader> 
        Quản lí thiết bị 
        </CCardHeader>
        <CCardBody>
        <CTable align="middle" class="mb-0 border" hover responsive bordered>
            <CTableHead color="light">
            <CTableRow style="text-align: center;">
                <CTableHeaderCell>Loại thiết bị</CTableHeaderCell>
                <CTableHeaderCell>Tên thiết bị</CTableHeaderCell>
                <CTableHeaderCell>Model</CTableHeaderCell>
                <CTableHeaderCell>Serial</CTableHeaderCell>
                <CTableHeaderCell>Cấu hình</CTableHeaderCell>
                <CTableHeaderCell>IP</CTableHeaderCell>
                <CTableHeaderCell>Bộ phận quản lí</CTableHeaderCell>
                <CTableHeaderCell>Mục đích sử dụng</CTableHeaderCell>
                <CTableHeaderCell>Hiện trạng</CTableHeaderCell>
                <CTableHeaderCell>Lịch sử sử dụng</CTableHeaderCell>
                <CTableHeaderCell>Ghi chú</CTableHeaderCell>
                <CTableHeaderCell>Thao tác</CTableHeaderCell>
            </CTableRow>
            </CTableHead>
            <CTableBody>
            <CTableRow v-for="d in devices" :key="d.ten" style="text-align: center;">
                <CTableDataCell>
                {{ d.loaithietbi }}
                </CTableDataCell>                  
                <CTableDataCell>
                {{ d.ten }}
                </CTableDataCell>
                <CTableDataCell>
                {{ d.model }}
                </CTableDataCell>
                <CTableDataCell>
                {{ d.serial }}
                </CTableDataCell>
                <CTableDataCell>
                {{ d.cauhinh }}
                </CTableDataCell>
                <CTableDataCell>
                {{ d.ip }}
                </CTableDataCell>
                <CTableDataCell>
                {{ d.quanli }}
                </CTableDataCell>
                <CTableDataCell>
                {{ d.mucdich }}
                </CTableDataCell>
                <CTableDataCell>
                {{ d.hientrang }}
                </CTableDataCell> 
                <CTableDataCell>
                <CButton color="secondary" @click="() => {seeAllHistory(d.id),visibleHistory = true}">
                    {{ d.lichsu }}
                </CButton>
                </CTableDataCell>
                <CTableDataCell>
                {{ d.ghichu }}
                </CTableDataCell>  
                <CTableDataCell>
                <CButton color="info"><router-link style="text-decoration: none;color: aliceblue;" :to="'/device/' + d.id">Sửa</router-link></CButton>
                </CTableDataCell>                                                                                                          
            </CTableRow>
            </CTableBody>
        </CTable>
        </CCardBody>
    </CCard>
</Row>
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
        <CTableRow  v-for="l in historyofDevice" :key="l.id">
          <div v-if="editHistory != l.id">
            <CTableDataCell>{{ l.chitiet }}</CTableDataCell>
          </div>  
          <div v-else>
            <CTableDataCell>
              <CInputGroup class="mb-3">
                <CFormInput placeholder="Edit history" v-model="editTextHistory" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                <CButton type="button" @click="updateHistory" color="info" variant="outline" id="button-addon2">Sửa</CButton>
              </CInputGroup>            
            </CTableDataCell>
          </div>  
          <CTableDataCell><CIcon @click="changeHistory(l.id)" icon="cilList" size="xl"/></CTableDataCell>
          <CTableDataCell><CCloseButton style="" black/></CTableDataCell>
        </CTableRow>
        <CTableRow>
            <CTableDataCell colspan="2">
                <CFormInput v-model="newHistory" id="autoSizingInput" placeholder="Them lich su"/>
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
    name: "ManageDevice",

    data() {
        return {
            visibleHistory: false,
            devices: null,
            historyofDevice: null,
            currentHistoryOfDevice: null,
            newHistory: '',
            editHistory: null,
            editTextHistory: '',
        };        
    },
    computed: {},
    methods: {
        getAllDevice() {
            axios.get(`http://localhost:3031/api/device`)
                .then(res => {
                this.devices = res.data;
                console.log(this.devices);
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
          this.editHistory=null;
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
        this.getAllDevice();
        this.historyofDevice = null;
        this.currentHistoryOfDevice=null;
        this.newHistory = '';
        this.editHistory = null;
        this.editTextHistory= '';        
    }
}

</script>