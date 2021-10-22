// //Update
// exports.Update = async (InputDTO) => {

//     const { email, password } = InputDTO;
//     const Record = await userModel.updateOne({ "email": email }, { "password": password })
//     if (Record.nModified <= 0) {
//         return { message: "No Modification", success: false }
//     }
//     else { return { message: "Data Updated", success: true }; }

// }

// //Delete
// exports.Delete = async (InputDTO) => {

//     const { email } = InputDTO;
//     const Record = await userModel.deleteOne({ "email": email })

//     if (Record.deletedCount == 0) {
//         return { message: "Data not Deleted", success: false }
//     }
//     else { return { message: "Data Deleted", success: true }; }

// }

// //Get-One
// exports.GetOne = async (InputDTO) => {

//     const { email } = InputDTO;
//     const Record = await userModel.findOne({ "email": email })

//     if (!Record) {
//         // throw new Error('Error! Data not Found');
//         return null
//     }
//     else return { Record };

// }

// //Get-All 
// exports.GetAll = async () => {

//     const Record = await userModel.find()
//     if (!Record) {
//         throw new Error('Error! No Data Found');
//     }
//     else return { Record };

// 

