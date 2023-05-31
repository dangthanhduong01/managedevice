const {excuteQuery} = require("./connection");
const { fetch } = require('undici');

const getAllDevice = async(req,reply) => {
    const name = req.query.name;
    try{
        let query="";
        query= name? `select * from device where ten like '%${name}%' and isdel=0`: "select * from device where isdel=0";
        let Data = await excuteQuery(query); 
        reply.status(200).send(Data);
    }catch(err){
        reply.status(500).send(err);
    }    
}

const addDevice = async(req,reply) => {
    try{
        let {ten,model,serial,cauhinh,ip,quanli,mucdich,hientrang,loaithietbi,lichsu,ghichu} = req.body;
        let pData= await excuteQuery(
            "INSERT INTO `managedevice`.`device` (`ten`, `model`, `serial`, `cauhinh`, `ip`, `quanli`, `mucdich`, `hientrang`, `loaithietbi`, `lichsu`, `ghichu`)" 
            + "VALUES (?,?,?,?,?,?,?,?,?,?,?)",
            [ten,model,serial,cauhinh,ip,quanli,mucdich,hientrang,loaithietbi,lichsu,ghichu]);
            reply.status(201).send(pData);
    }catch(err){
        reply.status(400).send(err);
    }
}

const updateDevice = async(req,reply) => {
    let id = req.params.id
    try{
        console.log(req.body);
        let {ten,model,serial,cauhinh,ip,quanli,mucdich,hientrang,loaithietbi,lichsu,ghichu} = req.body;
        let pData = await excuteQuery(
            `update managedevice.device set ten = ?, model = ?, serial = ?, cauhinh = ?, 
            ip=?,quanli=?,mucdich=?,hientrang=?,loaithietbi=?,lichsu=?,ghichu=? where id = ${id}`,
            [ten,model,serial,cauhinh,ip,quanli,mucdich,hientrang,loaithietbi,lichsu,ghichu]);
        reply.status(200).send('success');
    }catch(err){
        reply.status(400).send(err);
    }
}

const getDeviceById = async (req, reply) => {
    let id = req.params.id;
    try {
        let Data = await excuteQuery("select *  from device where id =?", [id]);
        reply.status(200).send(Data);
    } catch (err) {
        reply.status(500).send(err);
    }
}

const getAllSoftware = async(req,reply) => {
    const name = req.query.name;
    try{
        let query= name? `select * from software where ten like '%${name}%' and isdel=0`: "select * from software where isdel=0";
        let Data = await excuteQuery(query);
        reply.status(200).send(Data);
    }catch(err){
        reply.status(500).send(err);
    }    
}

const addSoftware = async(req,reply) => {
    try{
        let {ten, model, ip, mucdich, vitricaidat, hientrang, quanli, duan} = req.body;
        let pData= await excuteQuery(
            "INSERT INTO `managedevice`.`software` (`ten`, `model`, `ip`, `mucdich`, `vitricaidat`, `hientrang`, `quanli`, `duan`) " +
            "VALUES (?,?,?,?,?,?,?,?)",
            [ten, model, ip, mucdich, vitricaidat, hientrang, quanli, duan]);
            reply.status(201).send(pData);
    }catch(err){
        reply.status(400).send(err);
    }
}

const updateSoftware = async(req,reply) => {
    let id = req.params.id;
    try{
        console.log(req.body);
        let {ten, model, ip, mucdich, vitricaidat, hientrang, quanli, duan} = req.body;
        let pData = await excuteQuery(
            `update managedevice.software set  ten = ?, model = ?,ip=?,mucdich=?,vitricaidat=?,hientrang=?,quanli=?,duan=? where id = ${id}`,
            [ten, model, ip, mucdich, vitricaidat, hientrang, quanli, duan]);
        reply.status(200).send(success);
    }catch(err){
        reply.status(400).send(err);
    }
}

const getSoftwareById = async (req, reply) => {
    let id = req.params.id;
    try {
        let Data = await excuteQuery("select *  from software where id =?", [id]);
        reply.status(200).send(Data);
    } catch (err) {
        reply.status(500).send(err);
    }
}

const deleteDevice = async (req,reply) => {
    let id = req.params.id;
    try {
        await excuteQuery(`update managedevice.device set isdel=1 where id = ${id}`);
        reply.status(200).send('Xoa phan cung');
    }catch(e) {
        reply.status(500).send(e);
    }
}

const deleteSoftware = async (req,reply) => {
    let id = req.params.id;
    try {
        await excuteQuery(`update managedevice.software set isdel=1 where id = ${id}`);
        reply.status(200).send('Xoa phan mem');
    }catch(e) {
        reply.status(500).send(e);
    }
}

const getAllProject = async (req,reply) => {
    try {
        let data = await excuteQuery("select * from project");
        reply.status(200).send(data);
    }catch(e){
        reply.status(500).send(e);
    }
}

const getAllDeviceByProjectId = async (req,reply) => {
    let id = req.params.id;
    try {
        let data = await excuteQuery("select * from device inner join pro_device on pro_device.id_device=device.id where pro_device.id_project = ?",[id]);
        reply.status(200).send(data);
    }catch(e){
        reply.status(500).send(e);
    }
}

const getAllSoftwareByProjectId = async (req,reply) => {
    let id = req.params.id;
    try {
        let data = await excuteQuery("select * from software inner join pro_software on pro_software.id_software=software.id where pro_software.id_project = ?",[id]);
        reply.status(200).send(data);
    }catch(e){
        reply.status(500).send(e);
    }
}

const getAllDeviceNotInProject = async (req,reply) => {
    let id = req.params.id;
    try{
        let data = await excuteQuery(`select * from device where isdel=0 and device.id not in (select device.id from device inner join pro_device on device.id=pro_device.id_device where pro_device.id_project =${id})`);
        reply.status(200).send(data);
    }catch(e){
        reply.status(500).send(e);
    }
}

const getAllSoftwareNotInProject = async (req,reply) => {
    let id = req.params.id;
    try{
        let data = await excuteQuery(`select * from software where isdel=0 and software.id not in (select software.id from software inner join pro_software on software.id=pro_software.id_software where pro_software.id_project =${id})`);
        reply.status(200).send(data);
    }catch(e){
        reply.status(500).send(e);
    }
}

// INSERT INTO `managedevice`.`pro_device` (`id_device`, `id_project`) VALUES ('1', '2');
const addDeviceIntoProject = async (req,reply) => {
    let {id_device,id_project} =req.body;
    try{
        let data = await excuteQuery("INSERT INTO `managedevice`.`pro_device` (`id_device`, `id_project`) VALUES (?, ?)",[id_device,id_project]);
        reply.status(200).send('da them thiet bi');
    }catch(e){
        reply.status(500).send(e);  
    }
}

const addSoftwareIntoProject = async (req,reply) => {
    let {id_software,id_project} =req.body;
    try{
        let data = await excuteQuery("INSERT INTO `managedevice`.`pro_software` (`id_software`, `id_project`) VALUES (?, ?)",[id_software,id_project]);
        reply.status(200).send(data);
    }catch(e){
        reply.status(500).send(e);  
    }
}

// INSERT INTO `managedevice`.`project` (`ten`) VALUES ('s')
const addProject = async (req,reply) => {
    let {ten} = req.body;
    try{
        let data = await excuteQuery("INSERT INTO `managedevice`.`project` (`ten`) VALUES (?)",[ten]);
        reply.status(200).send('ok');
    }catch(e){
        reply.status(500).send(e);
    }
}
const deleteDeviceOnProject = async (req,reply) =>{
    let id_device = req.params.idd;
    let id_project = req.params.idp;
    try{
        await excuteQuery(`delete from pro_device where id_device=${id_device} and id_project = ${id_project} `);
        reply.status(200).send('Xóa thành công');
    }catch(e){
        reply.status(500).send(e);
    }
}
const deleteSoftwareOnProject = async (req,reply) =>{
    let id_software = req.params.ids;
    let id_project = req.params.idp;
    try{
        await excuteQuery(`delete from pro_software where id_software=${id_software} and id_project = ${id_project}`);
        reply.status(200).send('Xóa thành công');
    }catch(e){
        reply.status(500).send(e);
    }
}

const seeAllHistoryofDevice = async (req,reply) => {
    let id_device = req.params.id;
    try {
        let data = await excuteQuery(`select id, chitiet from lichsu where id_thietbi= ${id_device}`);
        reply.status(200).send(data);
    }catch(e) {
        reply.status(500).send(e);
    }
}
const updateHistoryofDevice = async (req,reply) => {
    let id = req.params.id;
    let {chitiet} = req.body;
    try {
        await excuteQuery(`UPDATE managedevice.lichsu SET chitiet = ${chitiet} WHERE (id = ${id});`);
        reply.status(200).send('thanh cong');
    }catch(e){
        reply.status(500).send(e);
    }
}
const deleteHistory = async (req,reply) => {
    let id = req.params.id;
    try{
        await excuteQuery(`delete from managedevice.lichsu where id= ${id}`);
        reply.status(200).send('Xoa thanh cong');
    }catch(e){
        reply.status(500).send(e);
    }
}
const addHistoryofDevice = async (req,reply) => {
    let {chitiet,id_device} = req.body;
    try {
        await excuteQuery('INSERT INTO `managedevice`.`lichsu` (`chitiet`, `id_thietbi`) VALUES (?, ?)',
        [chitiet,id_device]);
        reply.status(200).send('them thanh cong');
    }catch (e) {
        reply.status(500).send(e);
    }
}

module.exports = { getAllDevice, addDevice,getDeviceById,updateDevice ,getAllSoftware,
    addSoftware,getSoftwareById,updateSoftware,
    getAllProject,getAllDeviceByProjectId,
    getAllSoftwareByProjectId,addDeviceIntoProject,
    addSoftwareIntoProject,addProject,
    getAllDeviceNotInProject,getAllSoftwareNotInProject,
    deleteDeviceOnProject,deleteSoftwareOnProject,
    deleteDevice,deleteSoftware,
    seeAllHistoryofDevice,updateHistoryofDevice,addHistoryofDevice,deleteHistory};