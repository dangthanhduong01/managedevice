<template>
<!-- <CRow>
  <CCol :xs="12">
    <CCard style="width: 100%">
      <CCardHeader class="text-center">Loại thiết bị</CCardHeader>
      <CCardBody>
        <CCardSubtitle class="mb-2 text-muted"></CCardSubtitle>
        <CCardText><strong>Tổng thiết bị : </strong> {{ sumDevice }}</CCardText>
        <CCardText v-for="t in statisTypeDevice" :key="t.id">
          <strong>{{ t.tenloai }} : </strong> {{ t.sl }}
        </CCardText>
      </CCardBody>
    </CCard>           
  </CCol>
  <CCol :xs="0">
    <CChartPie style="height: 250px; width: 250px; margin: auto" :data="Data" />
  </CCol>
</CRow> -->
<Row>
    <CCard class="mb-4">
        <CCardHeader>
          <CRow>
            <strong class="text-center">Quản lí thiết bị</strong><br>
          </CRow>
            <CRow>
            <CCol xs="auto" class="me-auto">
            <CButton color="success" style="max-width: 120px;margin-right: 2px;">
              <router-link style="text-decoration: none;color: black; " :to="'/addNew/'">Thêm</router-link>
            </CButton> 
            <CButton  color="success" @click="handleExport">Xuất</CButton>
            </CCol>
            <CCol  xs="auto">
              <!-- <CFormSelect aria-label="Default select example" style="background-color:rgb(0, 128, 255)">
                <option>Loại thiết bị</option>
                <option v-for="t in statisTypeDevice" :key="t.id">
                  <strong>{{ t.tenloai }}  </strong>
                </option>
              </CFormSelect> -->
              <CDropdown>
                <CDropdownToggle color="info">{{ currentType }}</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem style="cursor:pointer" v-for="t in statisTypeDevice" :key="t.id">
                    <CButton @click="getAllDeviceByType(t.id,t.tenloai)">
                      <strong>{{ t.tenloai }} </strong>
                    </CButton>
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
        <CTable align="middle" class="mb-0 border" hover responsive bordered>
            <CTableHead color="light">
            <CTableRow class="text-center">
                <CTableHeaderCell>Loại thiết bị</CTableHeaderCell>
                <CTableHeaderCell>Tên thiết bị</CTableHeaderCell>
                <CTableHeaderCell>Model</CTableHeaderCell>
                <CTableHeaderCell>Serial</CTableHeaderCell>
                <CTableHeaderCell>Cấu hình</CTableHeaderCell>
                <CTableHeaderCell>IP</CTableHeaderCell>
                <CTableHeaderCell>Bộ phận quản lí</CTableHeaderCell>
                <CTableHeaderCell>Mục đích sử dụng</CTableHeaderCell>
                <CTableHeaderCell>Hiện trạng</CTableHeaderCell>
                <CTableHeaderCell>Lịch sử</CTableHeaderCell>
                <CTableHeaderCell>Ghi chú</CTableHeaderCell>
                <CTableHeaderCell>Thao tác</CTableHeaderCell>
            </CTableRow>
            </CTableHead>
            <CTableBody>
            <CTableRow v-for="d in devices" :key="d.ten" class="text-center">
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
                    Xem lịch sử
                </CButton>
                </CTableDataCell>
                <CTableDataCell>
                {{ d.ghichu }}
                </CTableDataCell>  
                <CTableDataCell>
                  <CButton color="info" style="padding: 0px 7px;"><router-link style="text-decoration: none;color: aliceblue;" :to="'/device/' + d.id">Sửa</router-link></CButton>
                  <CButton color="danger" style="padding: 0px 7px;" @click="idDevice=d.id; visible = true">
                    Xóa
                  </CButton>
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
            <CTableHeaderCell scope="col"></CTableHeaderCell>
            <CTableHeaderCell scope="col">Sửa</CTableHeaderCell>
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
          <CTableDataCell><CIcon @click="changeHistory(l.id)" icon="cilPencil" style="color:red" size="xl"/></CTableDataCell>
          <CTableDataCell><CIcon @click="deleteHistory(l.id)" icon="cilTrash" style="color:rgb(251, 255, 0)" size="xl"/></CTableDataCell>
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
    </CModalFooter>
  </CModal>
  <CModal :backdrop="false" :keyboard="false" :visible="visible"
          @close="() => { visible = false }" >
    <CModalHeader>
      <CModalTitle>Xoá thiết bị</CModalTitle>
    </CModalHeader>
    <CModalBody>Bạn có chắc chắn muốn xóa thiết bị?</CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { visible = false }">Đóng</CButton>
      <CButton color="danger" @click="deleteDevice(idDevice)">Xóa</CButton>
    </CModalFooter>
  </CModal>      
</template>
<script>
import axiosInstance from '../common/http-common';
import Papa from 'papaparse';
// import { CChartPie } from '@coreui/vue-chartjs';
export default {
    name: "ManageDevice",
    // components: { CChartPie },
    data() {
        return {
            visibleHistory: false,
            devices: null,
            historyofDevice: null,
            currentHistoryOfDevice: null,
            newHistory: '',
            editHistory: null,
            editTextHistory: '',
            idDevice: null,
            visible: false,
            statisTypeDevice: [],
            sumDevice: 0,
            currentType: 'Loại thiết bị',
        };        
    },
    computed: {
    //   Data() {
    //   return {
    //     labels: this.statisTypeDevice.map(obj => obj.tenloai),
    //     datasets: [
    //       {
    //         backgroundColor: ['#41B883', '#E46651','#41B883','#41B883','#41B883'],
    //         data: this.statisTypeDevice.map(obj=> obj.sl),
    //       },
    //     ],
    //   }
    // }
    },
    methods: {
        getStatisTypeDevice() {
          axiosInstance.get('http://192.168.25.50:3031/api/getStatisTypeDevice')
          .then(res =>{
            console.log(res.data);
            this.statisTypeDevice = Array.from(res.data);
          }).catch (e =>{
            console.log(e);
          })
        },
        getAllDeviceByType(id,tenloai){
          axiosInstance.get(`http://192.168.25.50:3031/api/getAllDeviceByType/${id}`)
          .then(res => {
            this.currentType= tenloai;
            this.devices = res.data;
          }).catch(e=>{
            alert(e);
          })
        },
        getAllDevice() {
            axiosInstance.get(`http://192.168.25.50:3031/api/device`)
                .then(res => {
                this.devices = res.data;
                console.log(this.devices);
                this.sumDevice = res.data.length;
            }).catch(e => {
                console.log(e);
            });
        },
        deleteDevice(id) {
          console.log(id);
          axiosInstance.put(`http://192.168.25.50:3031/api/device/deleteDevice/${id}`)
            .then(res =>{
              res;
              this.visible=false;
              this.getAllDevice();
              // this.$router.push({path:`/dashboard`});            
            }).catch(e => {
              console.log(e);
            });
        },
        seeAllHistory(id) {
          axiosInstance.get(`http://192.168.25.50:3031/api/allHistoryofDevice/${id}`)
          .then(res => {
            this.historyofDevice=res.data;
            this.currentHistoryOfDevice=id;
          }).catch(e=>{
            console.log(e);
          });
        },
        updateHistory(id){
          console.log(this.editHistory,this.editTextHistory);
          let data = {
            chitiet: this.editTextHistory,
          }
          axiosInstance.put(`http://192.168.25.50:3031/api/history/${id}`,data)
          .then(res=> {
            alert(res.data);
            this.editHistory=null;
            this.seeAllHistory(id);
            this.editTextHistory='';
          }).catch(e=> {
            alert(e);
          });
        },
        changeHistory(id){
          if(this.editHistory !=id){
            this.editHistory=id;
          }else{
            this.editHistory = null;
          }
          this.editTextHistory='';
        },
        deleteHistory(id) {
          axiosInstance.delete(`http://192.168.25.50:3031/api/deleteHistory/${id}`)
          .then(res => {
            // alert(res.data);
            this.seeAllHistory(id);
          }).catch(e => {
            alert(e);
          })
        },
        addHistory(id){
          console.log(id);
          let data= {
            chitiet: this.newHistory,
            id_device: this.currentHistoryOfDevice
          }
          axiosInstance.post("http://192.168.25.50:3031/api/addHistory",data)
          .then(res => {
            this.newHistory = '';
            alert(res.data);
          }).catch(e =>{
            alert(e);
          });
        },
        handleExport() {
          const data = this.devices;
          // Chuyển đổi dữ liệu thành chuỗi CSV
          const csv = Papa.unparse(data);

          // Tạo một đối tượng Blob từ chuỗi CSV
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

          // Tạo một đường dẫn tới file
          const url = URL.createObjectURL(blob);

          // Tạo một phần tử a để tạo và tải xuống file CSV
          const link = document.createElement('a');
          link.setAttribute('href', url);
          link.setAttribute('download', 'data.csv');
          link.click();

          // Giải phóng đường dẫn tới file
          URL.revokeObjectURL(url);     
        }                
    },
    mounted() {
        this.getAllDevice();
        this.historyofDevice = null;
        this.currentHistoryOfDevice=null;
        this.newHistory = '';
        this.editHistory = null;
        this.editTextHistory= '';     
        this.getStatisTypeDevice();  
        this.currentType= 'Loại thiết bị';
 
    }
}

</script>