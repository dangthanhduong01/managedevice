const app = require('fastify')();
const fs = require('fs')
const { routes, verify, authenticate } = require('./jwt');
app.register(routes);
const {getAllDevice, addDevice,getDeviceById,updateDevice,
    getAllSoftware, addSoftware,getSoftwareById,updateSoftware,
    getAllProject,getAllDeviceByProjectId,getAllSoftwareByProjectId,
    addDeviceIntoProject,addSoftwareIntoProject,addProject,
    getAllDeviceNotInProject,getAllSoftwareNotInProject,
    deleteDeviceOnProject,deleteSoftwareOnProject,
    deleteDevice,deleteSoftware,
    seeAllHistoryofDevice,updateHistoryofDevice,addHistoryofDevice,deleteHistory} = require("./device");


app.register(require("@fastify/cors"),{
    origin:"http://localhost:8080",
});



app.get("/api/device", getAllDevice);
app.get("/api/device/:id", getDeviceById);
app.post("/api/device/addDevice", addDevice);
app.put("/api/device/:id",updateDevice)
app.get("/api/software", getAllSoftware);
app.get("/api/software/:id", getSoftwareById);
app.post("/api/software/addSoftware", addSoftware);
app.put("/api/software/:id", updateSoftware);
app.put("/api/device/deleteDevice/:id",deleteDevice);
app.put("/api/software/deleteSoftware/:id",deleteSoftware);
app.get("/api/project",getAllProject);
app.get("/api/devicebyproject/:id",getAllDeviceByProjectId);
app.get("/api/softwarebyproject/:id",getAllSoftwareByProjectId);
app.post("/api/addDevicetoProject",addDeviceIntoProject);
app.post("/api/addSoftwaretoProject",addSoftwareIntoProject);
app.post("/api/project",addProject);
app.get("/api/devicenotinproject/:id",getAllDeviceNotInProject);
app.get("/api/softwarenotinproject/:id",getAllSoftwareNotInProject);
app.delete("/api/removedevicefromproject/:idd/:idp",deleteDeviceOnProject);
app.delete("/api/removesoftwarefromproject/:idd/:idp",deleteSoftwareOnProject);
app.get('/api/allHistoryofDevice/:id',seeAllHistoryofDevice);
app.put('/api/history/:id',updateHistoryofDevice);
app.post('/api/addHistory',addHistoryofDevice);
app.delete('/api/deleteHistory/:id',deleteHistory);


const start = async () => {
    try {
        app.listen(3031, (err, address) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            console.log(`server listening on ${address}`);
        });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
start();