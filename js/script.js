

            

  // window.localStorage.clear();


                                    //for loading the table on reload
var stored_list=JSON.parse(window.localStorage.getItem('s_s_list'));
   
if(stored_list==null){
  stored_list=[];
}else{
  len=stored_list.length;
    for(i=0;i<len;i++){
        var temp_dict=stored_list[i];
        var str=`<tr><th scope="row">`+(i+1).toString()+`</th><td>`+temp_dict['username']+`</td><td>`+temp_dict['category']+`</td><td><input id="`+(i+1).toString()+`" class="del" type="image" src="images/trash-icon.jpg" width="35" height="25" alt="X"
        /></td></tr>`;
        document.getElementById('tbody').innerHTML+=str;
    }
}
              
                                          //removes category dilter to show entire table 
$("#remove_filter").click(function() {
  location.reload();
});
                                          //filters the table by selected category
$('#filter').click(function() {
  document.getElementById('collapseExample3').innerHTML="";
  var str_cat='';
  var arr_cat=[];
  for(i=0;i<len;i++){
    var temp_dict=stored_list[i];
    arr_cat.push(temp_dict.category);
    }                                             
                                              //for giving options of category
  var  unique = [...new Set(arr_cat)];
  var uni_len=unique.length;
  for(i=0;i<uni_len;i++){
    str_cat+=`<div class="custom-control custom-radio" ><input type="radio" id="customRadio`+(i+1).toString()+`" name="customRadio" class="custom-control-input" value="`+unique[i]+`"><label class="custom-control-label" for="customRadio`+(i+1).toString()+`"><h3 sytyle="font-weight:500;">`+unique[i]+`</h3></label></div>`
      }
  str_cat+=`<button  class="btn btn-primary" id="cat_button">Filter</button> `;
  document.getElementById('collapseExample3').innerHTML+=str_cat;

                                        //to show filtered result
  $('#cat_button').click(function(click) {
  click.preventDefault();
  var stored_list=JSON.parse(window.localStorage.getItem('s_s_list'));
  document.getElementById('tbody').innerHTML='';
  var cat_selected=$("input[name='customRadio']:checked").val();
  len=stored_list.length;
  var count=0;
  for(i=0;i<len;i++){
    var temp_dict=stored_list[i];
    if(temp_dict['category']==cat_selected){
        var str=`<tr><th scope="row">`+(i+1).toString()+`</th><td>`+temp_dict['username']+`</td><td>`+temp_dict.category+`</td><td><input id="`+(i+1).toString()+`" class="del" type="image" src="images/trash-icon.jpg" width="35" height="25" alt="X"
  /></td></tr>`;
        document.getElementById('tbody').innerHTML+=str;
        count++;
    }
  }  
}); 

          

                                            //to update the table entries
$('#update_form').submit(update_fun);
  function update_fun(e){
  e.preventDefault();
  var update_values = $('#update_form').serializeArray();
  var str_len=(len).toString();
  var id=update_values[0].value;
  var new_username=update_values[1].value;
  var new_category=update_values[2].value;
  if(id>len || id<=0){
    alert("Invalid Id");
  }else{
    var dict={'username':new_username,'category':new_category};
    stored_list[id-1]=dict;
    window.localStorage.setItem('s_s_list', JSON.stringify(stored_list));
    location.reload();
    }
}
});

                                //to add new entries

$('#form').submit(addFun);

  function addFun(e){
  e.preventDefault();
  var values = $('#form').serializeArray();
  len=stored_list.length;
  var str_len=(len).toString();
  var dict={'username':values[0].value,'category':values[1].value};
  stored_list.push(dict);
  console.log(stored_list);
  window.localStorage.setItem('s_s_list', JSON.stringify(stored_list));
  len++;
  location.reload();
   }
                                        // to delete an entry

$('.del').click(function(event) {
  var stored_list=JSON.parse(window.localStorage.getItem('s_s_list'));
  var index=$(this).attr('id');
  var rem=stored_list.splice(index-1,1);
  window.localStorage.setItem('s_s_list', JSON.stringify(stored_list));
  location.reload();
});
   


          
              
