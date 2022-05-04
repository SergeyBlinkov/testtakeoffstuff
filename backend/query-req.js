

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'my_user',
    host: 'localhost',
    database : 'crudInfo',
    password : 'root',
    port : 5432
});


 const getUserInfo = async () => {
    return await new Promise((resolve, reject) => {
        pool.query('select * from infoUser', (error,result) => {
            if(error) {
                console.log('y')
                reject(error.message);
            }
            resolve(result)
        } )
    })
}
const updateUserInfo = async (uid,newName,phone,age) => {
     return await new Promise((resolve, reject) => {
         pool.query(`update infoUser set name = '${newName}', phone = ${phone}, age = ${age} where uid = ${uid}`,
             (error) => {
             if(error) {
                 reject(error)
             }
             resolve('Пользователь успешно отредактирован')
             })
     })
}

const createNewUser = async (newName,phone,age) => {
     return await new Promise((resolve, reject) => {
         pool.query(`insert into infoUser (name,phone,age) values ('${newName}','${phone}',${age})`,(error) => {
             if(error) {
                 reject(error)
             }
             resolve('Новый пользователь успешно добавлен')
         })
     })
}

const deleteUser = async (uid) => {
     return await new Promise((resolve, reject) => {
         pool.query(`delete from infoUser where uid=${uid}`,(error) => {
             if(error) {
                 reject(error.message)
             }
             resolve('Контакт успешно удален')
         })
     })
}

module.exports = {
     getUserInfo,
    updateUserInfo,
    createNewUser,
    deleteUser

}
