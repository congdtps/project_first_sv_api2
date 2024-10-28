const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)
const API_INFO='http://localhost:3000/info'


function start(){
    getAPI(renderApi)
    handlerAddApi()
}

start()

function getAPI(infos){
    fetch(API_INFO)
                .then((response)=>response.json())
                .then(infos)
}


function renderApi(infos){
    let html = infos.map((info)=>{
        return `
            <tr class="data-item-${info.id}">
                <td class="">${info.id}</td>
                <td class="info_code">${info.code}</td>
                <td class="info_name">${info.name}</td>
                <td class="info_gender">${info.gender}</td>
                <td class="info_pointing">${info.pointing}</td>
                <td class="info_rating">${info.rating}</td>
                <td>
                        <button class="btn-fix" onclick="handlerFixApi(${info.id})">Sửa</button>
                </td>
                  
                <td>
                        <button id="btn_delete" class="btn-delete" onclick="handlerDeleteApi(${info.id})">Xóa</button>
                </td>
            </tr>  
        `
    })

    let htmls= html.join('')
    $('.show_info').innerHTML=htmls
}


function addAPI(data,infos){
    let my_obj_add={
        method:"post",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data)
    }
    fetch(API_INFO,my_obj_add)
                            .then((response)=>response.json())
                            .then(infos)
}

function handlerAddApi(){
    $('#btn_add').onclick=function(e){
        e.preventDefault()
        let code_student=$('#code_api').value
        let name_student=$('#name_api').value
        let gender_student=$('#gender_api').value
        let pointing_student=$('#pointing_api').value
        let rating_student=$('#rating_api').value
        let data={
            code:code_student.toUpperCase(),
            name:name_student,
            gender:gender_student,
            pointing:pointing_student,
            rating:rating_student
        }
        // $('.js-table-add-success').classList.add('active')
        alert('Thêm sinh viên mới thành công')
        
        
        addAPI(data,()=>{
            getAPI(renderApi)
        })
    }
}

function handlerDeleteApi(id){
    alert('Đã xóa sinh viên thành công')
    let my_obj_delete={
        method:'delete',
    }
    fetch(API_INFO +'/'+id,my_obj_delete)
                            .then((response)=>response.json())
                            .then(()=>{
                                let data_item=$('.data-item-'+id)
                                if(data_item){
                                    data_item.remove()
                                }
                            }
                            )
}


function fixAPI(id,new_data,infos){
    let my_obj_fix={
        method:'put',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(new_data)
    }
    fetch(API_INFO+'/'+id,my_obj_fix)
                                .then((response)=>response.json())
                                .then(infos)
}


function handlerFixApi(id){
    $('.js-form-fix').classList.add('active')
    let all= $('.data-item-'+id)
    let info_code=all.querySelector('.info_code').innerText
    let info_name=all.querySelector('.info_name').innerText
    let info_gender=all.querySelector('.info_gender').innerText
    let info_pointing=all.querySelector('.info_pointing').innerText
    let info_rating=all.querySelector('.info_rating').innerText
    let btn_fix=$('#btn_fix')
    let code_input=$('#code_api')
    let name_input=$('#name_api')
    let gender_input=$('#gender_api')
    let pointing_input=$('#pointing_api')
    let rating_input=$('#rating_api')
    console.log(code_input)
    code_input.value=info_code
    name_input.value=info_name
    gender_input.value=info_gender
    pointing_input.value=info_pointing
    rating_input.value=info_rating
    btn_fix.addEventListener('click',()=>{
        alert("Cập nhật sinh viên thành công")
        let new_data={
            code:code_input.value.toUpperCase(),
            name:name_input.value,
            gender:gender_input.value,
            pointing:pointing_input.value,
            rating:rating_input.value,
        }

        fixAPI(id,new_data,()=>{
            code_input.value=""
            name_input.value=""
            gender_input.value=""
            pointing_input.value=""
            rating_input.value=""
            getAPI(renderApi)
            $('.js-form-fix').classList.remove('active')
        })
    })
}   
    
function close_app(){
    $('.js-form-fix').classList.remove('active')
    
}
