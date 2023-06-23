<template>
    <CRow>
      <CCol :xs="4">
        <CCard>
          <CCardHeader>
            <strong>Danh sách Phần cứng</strong>
          </CCardHeader>
          <CCardBody>
            <CListGroup v-for="(d,index) in allDevice" :key="index">
              <CListGroupItem>
                <CFormCheck :label="d.ten" :id="'radio1_'+d.id" @click="checkselectedDevice(d)"/>
              </CListGroupItem>
            </CListGroup>            
          </CCardBody>
        </CCard>
        <br>
        <CCard>
          <CCardHeader>
            <strong>Danh sách Phần mềm</strong>
          </CCardHeader>
          <CCardBody>
            <CListGroup v-for="s in allSoftware" :key="s.id">
              <CListGroupItem >
                <CFormCheck :label="s.ten" :id="'radio2_'+s.id" @click="checkselectedSoftware(s)"/>
              </CListGroupItem>
            </CListGroup>            
          </CCardBody>
        </CCard>        
      </CCol>
      <CCol :xs="2" style="margin-top: 10%;">
        <CButton color="info" style="margin-bottom: 20px;" @click="addSelectedDeviceToProject(currentProject)">Thêm phần cứng</CButton>    
        <CButton color="info" @click="addSelectedSoftwareToProject(currentProject)">Thêm phần mềm</CButton>       
      </CCol>
      <CCol :xs="6">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Quản lí dự án</strong>
        </CCardHeader>
        <CCardBody>
            <CNav variant="tabs" v-if="allProject !=null">
              <CNavItem v-for="(p,index) in allProject" :key="index">
                <CNavLink style="cursor: pointer;" :class="{active: index==currentIndex}" 
                @click="getAllDeviceByProjectId(p.id),
                        getAllSoftwareByProjectId(p.id),
                        getAllDeviceNotInProject(p.id),
                        getAllSoftwareNotInProject(p.id),
                        currentProject=p,
                        selectedDevice=[],
                        selectedSoftware=[],
                        currentIndex=index">
                  {{ p.ten }}
                </CNavLink>
              </CNavItem>
              <CNavItem style="font-weight: 800;max-width: 50px;">
                <CNavLink @click="visibleModal=true" >
                  +
                </CNavLink>
                <CModal :visible="visibleModal" @close="() => { visibleModal = false }">
                  <CInputGroup>
                    <CModalHeader>
                      <CModalTitle>Thêm dự án</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CFormInput aria-label="tenproject" v-model="project"/>
                    </CModalBody>
                    <CModalFooter>
                    <CButton color="secondary" @click="() => { visibleModal = false }">
                      Đóng
                    </CButton>
                    <CButton color="primary" @click="addNewProject()">Thêm</CButton>
                  </CModalFooter>
                  </CInputGroup>                  
                </CModal>                
              </CNavItem>
            </CNav>
            <CTable align="middle" class="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell class="text-center">Tên phần cứng</CTableHeaderCell>
                  <CTableHeaderCell>Sửa</CTableHeaderCell> 
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="d in allDeviceByProjectId" :key="d.id">
                  <CTableDataCell class="text-center">
                    {{ d.ten }}
                  </CTableDataCell> 
                  <CTableDataCell>
                    <CButton @click="removeDeviceFromProject(d,currentProject.id)">
                        x
                    </CButton>                  
                  </CTableDataCell>                                                                                                         
                </CTableRow>
              </CTableBody>
            </CTable>
            <br>
            <CTable align="middle" class="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell class="text-center">Tên phần mềm</CTableHeaderCell>
                  <CTableHeaderCell>Sửa</CTableHeaderCell> 
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="s in allSoftwareByProjectId" :key="s.id">
                  <CTableDataCell class="text-center">
                    {{ s.ten }}
                  </CTableDataCell> 
                  <CTableDataCell>
                    <CButton @click="removeSoftwareFromProject(s,currentProject.id)">
                        x
                    </CButton>                  
                  </CTableDataCell>                                                                                                         
                </CTableRow>
              </CTableBody>
            </CTable>                        
        </CCardBody>
      </CCard>
    </CCol>
    </CRow>
</template>

<script>
import axiosInstance from '../common/http-common';

export default {
    name: "Project",
    data() {
        return {
            currentIndex: -1,
            allProject: null,
            allDevice: null,
            allSoftware: null,
            allDeviceByProjectId: null,
            allSoftwareByProjectId: null,
            project: null,
            selectedDevice: [],
            selectedSoftware: [],
            currentProject: null,
            visibleModal: false,

        };
    },
    computed: {},
    methods: {

        // Lấy toàn bộ project trong database(ok)
        getAllProject() {
            axiosInstance.get(`http://192.168.25.50:3031/api/project`)
                .then(res => {
                this.allProject = res.data;
            }).catch(e => {
                console.log(e);
            });
        },
        // Lấy toàn bộ phần cứng trong database(ok)
        getAllDevice() {
            axiosInstance.get(`http://192.168.25.50:3031/api/device`)
                .then(res => {
                this.allDevice = res.data;
            }).catch(e => {
                console.log(e);
            });
        },
        // Lấy toàn bộ phần mềm trong database (ok)
        getAllSoftware() {
            axiosInstance.get(`http://192.168.25.50:3031/api/software`)
                .then(res => {
                this.allSoftware = res.data;
            }).catch(e => {
                console.log(e);
            });
        },
        // lấy toàn bộ phần cứng không có trong project
        getAllDeviceNotInProject(id) {
            axiosInstance.get(`http://192.168.25.50:3031/api/devicenotinproject/${id}`)
                .then(res => {
                this.allDevice = res.data;
                // this.checkedDevice= res.data.map(d=>d.id);
            }).catch(e => {
                console.log(e);
            });
        },
        // lấy toàn bộ phần mềm không có trong project
        getAllSoftwareNotInProject(id) {
            axiosInstance.get(`http://192.168.25.50:3031/api/softwarenotinproject/${id}`)
                .then(res => {
                this.allSoftware = res.data;
            }).catch(e => {
                console.log(e);
            });
        },
        // lấy toàn bộ phần cứng có trong project (ok)
        getAllDeviceByProjectId(id) {
            axiosInstance.get(`http://192.168.25.50:3031/api/devicebyproject/${id}`)
                .then(res => {
                this.allDeviceByProjectId = res.data;
            }).catch(e => {
                console.log(e);
            });
        },
        // lấy toàn bộ phần mềm có trong project (ok)
        getAllSoftwareByProjectId(id) {
            axiosInstance.get(`http://192.168.25.50:3031/api/softwarebyproject/${id}`)
                .then(res => {
                this.allSoftwareByProjectId = res.data;
            }).catch(e => {
                console.log(e);
            });
        },
        // thêm mới dự án
        addNewProject() {
            let d = {
                ten: this.project
            }
            axiosInstance.post("http://192.168.25.50:3031/api/project", d)
                .then(res => {
                console.log(res.data);
                this.allProject.push(d);
                this.visibleModal=false;
            }).catch(e => {
                console.log(e);
            });
        },
        //Thêm nhiều phần cứng đã chọn vào prj
        async addSelectedDeviceToProject(cp) {
            if(cp == null){
              alert("Hãy chọn project!!!");
            }else if (this.selectedDevice.length > 0) {
                for (let d in this.selectedDevice) {
                    let dt = {
                        id_device: this.selectedDevice[d].id,
                        id_project: cp.id
                    };
                    this.allDevice.splice(d, 1);
                    let radio = document.getElementById('radio1_'+this.selectedDevice[d].id);
                    radio.checked = false;
                    await axiosInstance.post("http://192.168.25.50:3031/api/addDevicetoProject", dt)
                        .catch(e => {
                        console.log(e);
                    });
                    this.allDeviceByProjectId.push(this.selectedDevice[d]);
                }
                this.getAllDeviceNotInProject(cp.id);
            }
            
            this.selectedDevice = [];
        },
        // thêm phần mềm đã chọn vào project
        async addSelectedSoftwareToProject(cp) {
            if(cp == null){
              alert("Hãy chọn project!!!");
            }else if (this.selectedSoftware.length > 0) {
                for (let s in this.selectedSoftware) {
                    let dt = {
                        id_software: this.selectedSoftware[s].id,
                        id_project: cp.id
                    };
                    this.allSoftware.splice(s, 1);
                    let radio = document.getElementById('radio2_'+this.selectedSoftware[s].id);
                    radio.checked = false;
                    await axiosInstance.post("http://192.168.25.50:3031/api/addSoftwaretoProject", dt)
                        .catch(e => {
                        console.log(e);
                    });
                    this.allSoftwareByProjectId.push(this.selectedSoftware[s]);
                }
                this.getAllSoftwareNotInProject(cp.id);
            }
            this.selectedSoftware = [];
        },
        async checkselectedDevice(device) {
            console.log(this.selectedDevice);
            let index = this.selectedDevice.findIndex(dv => dv.id === device.id);
            if (index !== -1) {
                this.selectedDevice.splice(index, 1);
            }
            else {
                this.selectedDevice.push(device);
            }
        },
        async checkselectedSoftware(software) {
            console.log(this.selectedSoftware);
            let index = this.selectedSoftware.findIndex(sw => sw.id === software.id);
            if (index !== -1) {
                this.selectedSoftware.splice(index, 1);
            }
            else {
                this.selectedSoftware.push(software);
            }
        },
        removeDeviceFromProject(device, id_project) {
            let id_device = device.id_device;
            axiosInstance.delete(`http://192.168.25.50:3031/api/removedevicefromproject/${id_device}/${id_project}`)
                .then(res => {
                let index = this.allDeviceByProjectId.findIndex(dv => dv.id_device === id_device);
                if (index !== -1) {
                    this.allDeviceByProjectId.splice(index, 1);
                }
                this.allDevice.push(device);
                alert(res.data);
            }).catch(e => {
                console.log(e);
            });
        },
        removeSoftwareFromProject(software, id_project) {
            let id_software = software.id_software;
            axiosInstance.delete(`http://192.168.25.50:3031/api/removesoftwarefromproject/${id_software}/${id_project}`)
                .then(res => {
                let index = this.allSoftwareByProjectId.findIndex(sw => sw.id_software === id_software);
                if (index !== -1) {
                    this.allSoftwareByProjectId.splice(index, 1);
                }
                this.allSoftware.push(software);
                alert(res.data);
            }).catch(e => {
                console.log(e);
            });
        },
    },
    mounted() {
        this.getAllProject();
        this.getAllDevice();
        this.getAllSoftware();
    },
}
</script>
<style>

</style>