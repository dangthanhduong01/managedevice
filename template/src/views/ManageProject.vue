<template>
    <div>
        <CRow>
            <CCol :xs="12">
                <CCard>
                    <CCardHeader style="background-color: #3c8dbc;">
                        <CRow>
                            <CCol xs="auto" class="me-auto">
                                <strong>Danh sách Project</strong>
                            </CCol>
                            <CCol xs="auto">
                                <CButton color="success" @click="() => { visibleHandler = 1 }">Thêm dự án</CButton>
                            </CCol>
                        </CRow>
                    </CCardHeader>
                    <CCardBody>
                        <!-- <CNav variant="tabs" v-if="allProject !=null">
                            <CNavItem>
                                <CNavLink @click="handleClick=1,getAllDeviceByProjectId(currentProject)" :class="{active: handleClick==1}">
                                    Phần cứng
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink @click="handleClick=2,getAllSoftwareByProjectId(currentProject)" :class="{active: handleClick==2}">
                                    Phần mềm
                                </CNavLink>
                            </CNavItem>
                        </CNav> -->
                        <CTable bordered>
                        <CTableHead>
                            <CTableRow class="text-center">
                                <CTableHeaderCell>ID</CTableHeaderCell>
                                <CTableHeaderCell>Tên dự án</CTableHeaderCell>
                                <CTableHeaderCell>Khởi tạo</CTableHeaderCell>
                                <CTableHeaderCell>Cập nhật</CTableHeaderCell>
                                <CTableHeaderCell>Ghi chú</CTableHeaderCell>
                                <CTableHeaderCell>Xem chi tiết</CTableHeaderCell>
                                <CTableHeaderCell colspan="2">Thay đổi</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="(p,index) in allProject" :key="index" class="text-center">
                                <CTableHeaderCell>{{ p.id }}</CTableHeaderCell>
                                <CTableHeaderCell>{{ p.ten }}</CTableHeaderCell>
                                <CTableHeaderCell>{{ p.created_at }}</CTableHeaderCell>
                                <CTableHeaderCell>{{ p.update_at }}</CTableHeaderCell>
                                <CTableHeaderCell>{{ p.ghichu }}</CTableHeaderCell>
                                <CTableHeaderCell>Chọn</CTableHeaderCell>
                                <CTableHeaderCell>Sửa</CTableHeaderCell>
                                <CTableHeaderCell>Xóa</CTableHeaderCell>
                            </CTableRow>
                        </CTableBody>
                        </CTable>
                        <!-- <div v-if="handleClick==1">
                            <CTable align="middle" class="mb-0 border" hover responsive>
                                <CTableHead color="light">
                                    <CTableRow>
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
                                    <CTableRow v-for="d in allDeviceByProjectId" :key="d.id">
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
                                        <CButton @click="removeDeviceFromProject(d,currentProject.id)" color="info">
                                            x
                                        </CButton>                  
                                    </CTableDataCell>                                                                                                          
                                    </CTableRow>
                                </CTableBody>
                            </CTable>
                        </div>
                        <div v-else-if="handleClick==2">
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
                        </div>
                        <div v-else>
                            <p style="text-align: center;">Click on project</p>
                        </div> -->
                    </CCardBody> 
                </CCard>
            </CCol>
            <!-- <CCol :xs="6">
                <CCard>
                    <CCardHeader>
                        <strong>Quản Lí</strong>
                    </CCardHeader>     
                    <CCardBody>
                        <CNav variant="tabs" v-if="allProject !=null">
                            <CNavItem>
                                <CNavLink @click="handleClick=1,getAllDeviceByProjectId(currentProject)" :class="{active: handleClick==1}">
                                    Phần cứng
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink @click="handleClick=2,getAllSoftwareByProjectId(currentProject)" :class="{active: handleClick==2}">
                                    Phần mềm
                                </CNavLink>
                            </CNavItem>
                        </CNav>
                        <div v-if="handleClick==1">
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
                        </div>
                        <div v-else-if="handleClick==2">
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
                        </div>
                        <div v-else>
                            <p>Click on project</p>
                        </div>
                    </CCardBody>               
                </CCard>
            </CCol> -->
        </CRow>
    </div>
<CModal backdrop="static" :visible="visibleHandler==1" @close="() => { visibleHandler = 0 }">
    <CModalHeader>
        <CModalTitle>Thêm dự án</CModalTitle>
    </CModalHeader>
    <CModalBody>
        <br>
        <CForm class="row g-3">
            <CRow class="mb-3">
                <CFormLabel for="tenduan" class="col-sm-3 col-form-label">Tên dự án</CFormLabel>
                <div class="col-sm-8">
                    <CFormInput type="text" id="tenduan" v-model="project.ten"/>
                </div>
                </CRow>
                <CRow class="mb-3">
                <CFormLabel for="ghichu" class="col-sm-3 col-form-label">Ghi chú</CFormLabel>
                <div class="col-sm-8">
                    <CFormInput type="text" id="ghichu" v-model="project.ghichu"/>
                </div>  
            </CRow>
        </CForm>
    </CModalBody>
    <CModalFooter>
        <CButton color="secondary" @click="() => { visibleHandler = 0 }">
        Close
        </CButton>
        <CButton color="primary" @click="addProject()">Thêm</CButton>
    </CModalFooter>
</CModal>    
</template>
<script>
import axiosInstance from '../common/http-common';
export default {
    name: "ManageProject",
    data() {
        return {
            allProject: null,
            handleClick:0,
            allDeviceByProjectId: null,
            allSoftwareByProjectId: null,
            currentProject: null,
            visibleHandler: 0,
            project: {
                ten: '',
                ghichu: '',
            }
        };
    },
    methods: {
        getAllProject() {
            axiosInstance.get(`http://192.168.25.50:3031/api/project`)
                .then(res => {
                this.allProject = res.data;
                console.log(this.allProject);
            }).catch(e => {
                console.log(e);
            });
        },
        addProject() {
            console.log(this.project);
            axiosInstance.post("http://192.168.25.50:3031/api/project", this.project)
                .then(res => {
                console.log(res.data);
                this.allProject.push(this.project);
                this.visibleHandler=0;
            }).catch(e => {
                alert(e);
            });
        },
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
    },
    mounted() {
        this.getAllProject();
    },
}
</script>