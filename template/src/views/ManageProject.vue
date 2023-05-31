<template>
    <div>
        <CRow>
            <CCol :xs="12">
                <CCard>
                    <CCardHeader>
                        <strong>Danh sách Project</strong>
                        <CDropdown style="margin-left: 70%;">
                        <CDropdownToggle color="secondary">Danh sách dự án</CDropdownToggle>
                        <CDropdownMenu>
                            <div v-for="(p,index) in allProject" :key="index">
                            <CDropdownItem @click="currentProject=p.id,handleClick=1,getAllDeviceByProjectId(p.id)">{{ p.ten }}</CDropdownItem>
                            </div>
                        </CDropdownMenu>
                        </CDropdown>
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
                        </div>
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
</template>
<script>
import axios from 'axios';

export default {
    name: "ManageProject",
    data() {
        return {
            allProject: null,
            handleClick:0,
            allDeviceByProjectId: null,
            allSoftwareByProjectId: null,
            currentProject: null,
        };
    },
    methods: {
        getAllProject() {
            axios.get(`http://localhost:3031/api/project`)
                .then(res => {
                this.allProject = res.data;
                console.log(this.allProject);
            }).catch(e => {
                console.log(e);
            });
        },
        getAllDeviceByProjectId(id) {
            axios.get(`http://localhost:3031/api/devicebyproject/${id}`)
                .then(res => {
                this.allDeviceByProjectId = res.data;
            }).catch(e => {
                console.log(e);
            });
        },
        // lấy toàn bộ phần mềm có trong project (ok)
        getAllSoftwareByProjectId(id) {
            axios.get(`http://localhost:3031/api/softwarebyproject/${id}`)
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