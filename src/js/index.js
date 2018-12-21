
import '../styles/default.scss';




var todos_creator = document.querySelector(".todos-creator_text-input-w");
var input = document.querySelector('.todos-creator_text-input');
var todos_list = document.querySelector('.todos-list');
var check_all = document.querySelector('.todos-creator_check-all');
/*var count = document.querySelector()*/
document.querySelector(".todos-toolbar_unready-counter").textContent="123456";




check_all.addEventListener('click',function () {
    var items=todos_list.querySelectorAll('.todos-list_item');
   for(var i=0;i<items.length;i++){
       var check_item_target = items[i].querySelector('.custom-checkbox_target');
       check_item_target.setAttribute('checked','checked');
       console.log(check_item_target.checkResult());
   }
});

todos_creator.addEventListener('change', function () {
    var text = input.value;
    var items=todos_list.querySelectorAll('.todos-list_item');
    for(var i=0;i<items.length;i++){
        var item_text = items.item(i).querySelector('.todos-list_item_text');
        if (item_text.value === text){
            return;
        }
    }
    document.querySelector('.todos-board').classList.add('__has-content');
    input.value = "";
    addItem(text);

});

function addItem(text) {
    var template = templates.item({
        text: text
    });
    todos_list.appendChild(template);
    template.querySelector('.todos-list_item_remove').addEventListener('click',function (template) {
        todos_list.removeChild(this.parentNode);
        var count = todos_list.querySelectorAll('.todos-list_item').length;
        console.log(count);
        if (count === 1){
            document.querySelector('.todos-board').classList.remove('__has-content');
        }
    });
    console.log("Item was added");
}

var templates = {
    item: function (data) {
        var list_item = document.createElement('div');
        list_item.classList.add('todos-list_item');
            var custom_checkbox = document.createElement('div');
            custom_checkbox.classList.add('custom-checkbox');
            custom_checkbox.classList.add('todos-list_item_ready-marker');
                var checkbox_target = document.createElement('input');
                checkbox_target.classList.add('custom-checkbox_target');
                checkbox_target.setAttribute('type','checkbox');
                checkbox_target.setAttribute('aria-label','Mark todo as ready');
                var checkbox_visual = document.createElement('div');
                checkbox_visual.classList.add('custom-checkbox_visual');
                    var checkbox_visual_icon = document.createElement('div');
                    checkbox_visual_icon.classList.add('custom-checkbox_visual_icon');
                checkbox_visual.appendChild(checkbox_visual_icon);
            custom_checkbox.appendChild(checkbox_target);
            custom_checkbox.appendChild(checkbox_visual);

            var button_remove = document.createElement('button');
            button_remove.classList.add('todos-list_item_remove');
            button_remove.setAttribute('aria-label','Delete todo');

            var item_text = document.createElement('div');
            item_text.classList.add('todos-list_item_text-w');
                var text = document.createElement('textarea');
                text.classList.add('todos-list_item_text');
                text.setAttribute('readonly','readonly');
                text.setAttribute('rows','1');
                text.value = data.text;
            item_text.appendChild(text);

        list_item.appendChild(custom_checkbox);
        list_item.appendChild(button_remove);
        list_item.appendChild(item_text);

        return list_item;
    }
};

console.log('init');