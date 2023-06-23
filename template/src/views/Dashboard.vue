<template>
  <div>
    <CRow>
      
    </CRow>
    <CRow>
      <CCol :xs="4" style="text-align: center;">
      <CWidgetStatsA class="mb-3" color="danger">
        <template #value>Thiết bị: 
            {{ sumDevices }}
        </template>
        <template #title><router-link class="footerWidget" :to="'/allDevice/'">Xem thiết bị</router-link></template>
        <template #action>
          <CDropdown placement="bottom-end">
            <CDropdownToggle
              color="transparent"
              class="p-0 text-white"
              :caret="false">
              <CIcon icon="cil-options" class="text-high-emphasis-inverse" />
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem href="#">Action</CDropdownItem>
              <CDropdownItem href="#">Another action</CDropdownItem>
              <CDropdownItem href="#">Something else here</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </template>
      </CWidgetStatsA>
      </CCol>
      <CCol :xs="4">
      <CWidgetStatsA class="mb-3" color="info">
        <template #value>Phần mềm:
            {{ sumSoftware }}
        </template>
        <template #title><router-link class="footerWidget" :to="'/allSoftware/'">Xem phần mềm</router-link></template>
        <template #action>
          <CDropdown placement="bottom-end">
            <CDropdownToggle
              color="transparent"
              class="p-0 text-white"
              :caret="false"
            >
              <CIcon icon="cil-options" class="text-high-emphasis-inverse" />
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem href="#">Action</CDropdownItem>
              <CDropdownItem href="#">Another action</CDropdownItem>
              <CDropdownItem href="#">Something else here</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </template>
      </CWidgetStatsA>
      </CCol>
      <CCol :xs="4">
      <CWidgetStatsA class="mb-3" color="warning">
        <template #value>Dự án:
            {{ allProjectLength }}
        </template>
        <template #title><router-link class="footerWidget" :to="'/allProject/'">Xem dự án</router-link></template>
        <template #action>
          <CDropdown placement="bottom-end">
            <CDropdownToggle
              color="transparent"
              class="p-0 text-white"
              :caret="false"
            >
              <CIcon icon="cil-options" class="text-high-emphasis-inverse" />
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem href="#">Action</CDropdownItem>
              <CDropdownItem href="#">Another action</CDropdownItem>
              <CDropdownItem href="#">Something else here</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </template>
      </CWidgetStatsA>
      </CCol>            
    </CRow>
    <CRow>
      <CCard>
        <CCardHeader>
          <CDropdown>
            <CDropdownToggle color="warning" v-if="currentProject!=null">              
                {{ currentProject.ten }}
            </CDropdownToggle>
            <CDropdownToggle color="warning" v-else>              
                Chọn Dự án
            </CDropdownToggle>            
            <CDropdownMenu>
              <div v-for="(p,index) in allProject" :key="index">
                <CDropdownItem :class="{active: index==currentIndex}"
                @click="currentProject = p,getStatisDeviceOfProject(p),
                getStatisSoftwareOfProject(p),currentIndex= index">
                {{ p.ten }}</CDropdownItem>
              </div>
            </CDropdownMenu>
          </CDropdown>
        </CCardHeader>
        <CCardBody>
          <CRow v-if="currentProject!=null">
          <CCol :xs="6">
            <CListGroup flush>
              <CListGroupItem>Dự án: {{ currentProject.ten }}</CListGroupItem>
              <CListGroupItem>Số thiết bị trong dự án: {{ DeviceOfCurrentProject }}</CListGroupItem>
              <CListGroupItem>Số phần mềm trong dự án: {{ SoftwareOfCurrentProject }}</CListGroupItem>
              <CListGroupItem><CButton color="info">Chi tiết</CButton></CListGroupItem>
            </CListGroup>            
          </CCol>
          <CCol :xs="6">
            <CChartPie style="height: 250px; width: 250px; margin: auto" :data="defaultData" />
          </CCol>
          </CRow>
          <CRow v-else>
            <CCol :xs="4">
              <CRow class="text-center border "><strong>Thống kê tổng thể</strong></CRow>  
              <CListGroup flush>
                <CListGroupItem>Tổng Dự án: {{ allProjectLength }}</CListGroupItem>
                <CListGroupItem>Tổng thiết bị: {{ sumDevices }}</CListGroupItem>
                <CListGroupItem>Tổng phần mềm: {{ sumSoftware }}</CListGroupItem>
                <CListGroupItem><CButton color="info">Chi tiết</CButton></CListGroupItem>
              </CListGroup>            
            </CCol>
            <CCol :xs="4">
              <CRow class="text-center border "><strong>Loại thiết bị</strong></CRow>
              <CListGroup flush class="text-left">
                <CListGroupItem v-for="t in statisTypeDevice" :key="t.id">
                  <strong>{{ t.tenloai }} : </strong> {{ t.sl }}
                </CListGroupItem>
              </CListGroup>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CRow>
    <CRow>
      <CButton color="success" style="max-width: 120px;margin-left:87%">
        <router-link style="text-decoration: none;color: aliceblue;" :to="'/addNew/'">Thêm thiết bị</router-link>
      </CButton>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader> 
            Quản lí thiết bị 
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" class="mb-0 border" hover responsive bordered>
              <CTableHead color="light">
                <CTableRow class="text-center" style="padding:-0.5rem">
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
                      <!-- {{ d.lichsu }} -->Xem lịch sử
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    {{ d.ghichu }}
                  </CTableDataCell>  
                  <CTableDataCell >
                    <CButton color="info"><router-link style="text-decoration: none;color: aliceblue;" :to="'/device/' + d.id">Sửa</router-link></CButton>
                  </CTableDataCell>                                                                                                          
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
  <div>
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader> Quản lí Phần mềm </CCardHeader>
          <CCardBody>
            <CTable align="middle" class="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow class="text-center">
                  <CTableHeaderCell>Tên phần mềm</CTableHeaderCell>
                  <CTableHeaderCell>Model</CTableHeaderCell>
                  <CTableHeaderCell>IP</CTableHeaderCell>
                  <CTableHeaderCell>Mục đích sử dụng</CTableHeaderCell>
                  <CTableHeaderCell>Vị trí cài đặt</CTableHeaderCell>
                  <CTableHeaderCell>Hiện trạng</CTableHeaderCell>
                  <CTableHeaderCell>Quản lí</CTableHeaderCell>
                  <CTableHeaderCell>Dự án</CTableHeaderCell>
                  <CTableHeaderCell>Thao tác</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="s in softwares" :key="s.ten" class="text-center">
                  <CTableDataCell>
                    {{ s.ten }}
                  </CTableDataCell>
                  <CTableDataCell>
                    {{ s.model }}
                  </CTableDataCell>
                  <CTableDataCell >
                    {{ s.ip }}
                  </CTableDataCell>
                  <CTableDataCell>
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
                    <CButton color="info"><router-link style="text-decoration: none;color: aliceblue;" :to="'/software/' + s.id">Sửa</router-link></CButton>                  
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
            <!-- <CTableHeaderCell scope="col">#</CTableHeaderCell> -->
            <CTableHeaderCell colspan="2">Edit</CTableHeaderCell>
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
                <CButton type="button" @click="updateHistory(editHistory)" color="info" variant="outline" id="button-addon2">Sửa</CButton>
              </CInputGroup>            
            </CTableDataCell>
          </div>  
          <CTableDataCell><CIcon @click="changeHistory(l.id)" icon="cilPencil" style="color:red" size="xl"/></CTableDataCell>
          <!-- <CCloseButton style="" black/> -->
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
      <!-- <CButton color="primary">Save changes</CButton> -->
    </CModalFooter>
  </CModal>
</template>

<script>
import axiosInstance from '../common/http-common';
import { CChartPie } from '@coreui/vue-chartjs';
// import authHeader from '../services/auth-header';
  export default {
    name: "Dashboard",
    components: { CChartPie },
    data() {
        return {
            currentProject: null,
            currentIndex: -1,
            visibleHistory: false,
            devices: null,
            softwares: null,
            allProject: null,
            allProjectLength: 0,
            historyofDevice: null,
            currentHistoryOfDevice: null,
            newHistory: '',
            editHistory: null,
            editTextHistory: '',
            sumDevices: 0,
            sumSoftware: 0,
            statistic:0,
            DeviceOfCurrentProject: 0,
            SoftwareOfCurrentProject: 0,
            statisTypeDevice: [],
        };
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }, 
      defaultData() {
      return {
        labels: ['Phần cứng', 'Phần mềm'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651'],
            data: [this.DeviceOfCurrentProject, this.SoftwareOfCurrentProject],
          },
        ],
      }
    },
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
        getAllProject() {
          axiosInstance.get(`http://192.168.25.50:3031/api/project`)
                .then(res => {
                this.allProject = res.data;
                this.allProjectLength = res.data.length;
                console.log("tất cả project :",this.allProject);
            }).catch(e => {
                console.log(e);
            });
        },
        getStatisDeviceOfProject(project) {
          axiosInstance.get(`http://192.168.25.50:3031/api/countDeviceOfProject/${project.id}`)
            .then(res => {
              this.DeviceOfCurrentProject = res.data[0].sum;
            }).catch(e=> {
              console.log(e);
            });
        },    
        getStatisSoftwareOfProject(project) {
          axiosInstance.get(`http://192.168.25.50:3031/api/countSoftwareOfProject/${project.id}`)
            .then(res => {
              this.SoftwareOfCurrentProject = res.data[0].sum;
            }).catch(e=> {
              console.log(e);
            });
        },          
        getAllDevice() {
            axiosInstance.get(`http://192.168.25.50:3031/api/device`,)
                .then(res => {
                this.devices = res.data;
                console.log(this.devices);
                this.sumDevices=res.data.length;
            }).catch(e => {
                console.log(e);
            });
        },
        // updateDevice(id) {
        //     axiosInstance.put(`http://192.168.25.50:3031/api/device/${id}`)
        //         .then(res => {
        //         console.log(res.data);
        //     }).catch(e => {
        //         console.log(e);
        //     });
        // },
        getAllSoftware() {
            axiosInstance.get(`http://192.168.25.50:3031/api/software`)
                .then(res => {
                this.softwares = res.data;
                console.log(this.softwares);
                this.sumSoftware=res.data.length;
            }).catch(e => {
                console.log(e);
            });
        },
        // updateSoftware(id) {
        //     axiosInstance.put(`http://192.168.25.50:3031/api/software/${id}`)
        //         .then(res => {
        //         console.log(res.data);
        //     }).catch(e => {
        //         console.log(e);
        //     });
        // },
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
        deleteHistory(id) {
          axiosInstance.delete(`http://192.168.25.50:3031/api/deleteHistory/${id}`)
          .then(res => {
            // alert(res.data);
            this.seeAllHistory(id);
          }).catch(e => {
            alert(e);
          })
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
          axiosInstance.post("http://192.168.25.50:3031/api/addHistory",data)
          .then(res => {
            res;
            this.seeAllHistory(id);
            this.newHistory = '';
          }).catch(e =>{
            alert(e);
          });
        }
    },
    mounted() {
        if(!this.currentUser){
          this.$router.push("/login");
        }else{
          console.log('test usr',this.currentUser);
          console.log('test permission',this.currentPermission);
        }
        
        this.getAllDevice();
        this.getAllSoftware();
        this.getAllProject();
        this.getStatisTypeDevice()
        this.historyofDevice = null;
        this.currentHistoryOfDevice=null;
        this.newHistory = '';
        this.editHistory = null;
        this.editTextHistory= '';
    },
}
</script>
<style>
.footerWidget {
  text-decoration: none;
  color: white;
  text-align: center;
}
</style>