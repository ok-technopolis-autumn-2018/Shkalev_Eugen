
import '../styles/default.scss';

document.addEventListener('DOMContentLoaded',function () {


    var todos_creator = document.querySelector(".todos-creator_text-input-w");
    var input = document.querySelector('.todos-creator_text-input');
    var todos_list = document.querySelector('.todos-list');
    var check_all = document.querySelector('.todos-creator_check-all');
    var clear = document.querySelector(".todos-toolbar_clear-completed");
    var itemLeft = 0;

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
        template.querySelector('.todos-list_item_remove').addEventListener('click',function () {
            todos_list.removeChild(this.parentNode);
            if (!this.parentNode.querySelector('.custom-checkbox_target').checked){
                itemLeft--;
                updateCounter();
            }
            var count = todos_list.querySelectorAll('.todos-list_item').length;
            console.log(count);
            if (count === 0){
                document.querySelector('.todos-board').classList.remove('__has-content');
            }
        });
        template.querySelector('.todos-list_item_ready-marker').addEventListener('click',function () {
            if (this.querySelector('.custom-checkbox_target').checked){
                itemLeft--;
            }else{
                itemLeft++;
            }
            updateCounter();
        });
        itemLeft++;
        updateCounter();
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

    check_all.addEventListener('click',function () {
        var items=todos_list.querySelectorAll('.todos-list_item');
        for(var i=0;i<items.length;i++){
            var check_item_target = items[i].querySelector('.custom-checkbox_target');
            check_item_target.setAttribute('checked','checked');
        }
        itemLeft=0;
        updateCounter();
    });

    function updateCounter(){
        var message
        if (itemLeft <= 0) {
            itemLeft=0;
            message = ' item';
        }
        if (itemLeft==1){
            message = ' item';
        }
        if (itemLeft>1){
            message = ' items';
        }
        document.querySelector('.todos-toolbar_unready-counter').textContent = itemLeft + message + ' left';
    }

    function unSelectedAllFilters(){
        var filters = document.querySelectorAll('.todos-toolbar_filter');
        for (var i=0;i<3;i++){
            filters[i].classList.remove('__selected');
        }
    }

    document.querySelector('.__All').addEventListener('click',function () {
        unSelectedAllFilters();
        document.querySelector('.__All').classList.add('__selected');
    });

    document.querySelector('.__Active').addEventListener('click',function () {
        unSelectedAllFilters();
        document.querySelector('.__Active').classList.add('__selected');
    });

    document.querySelector('.__Completed').addEventListener('click',function () {
        unSelectedAllFilters();
        document.querySelector('.__Completed').classList.add('__selected');
    });

    clear.addEventListener('click',function () {
        var filter = document.querySelector('.__selected');
        var items = todos_list.querySelectorAll('.todos-list_item');
        var countItems = todos_list.querySelectorAll('.todos-list_item').length;
        if (filter.classList.contains('__All')){
            for(var i=0;i<items.length;i++){
                items[i].parentNode.removeChild(items[i]);
                document.querySelector('.todos-board').classList.remove('__has-content');
            }
            itemLeft=0;
        }

        if (filter.classList.contains('__Active')){
            for(var i=0;i<items.length;i++){
                if (!items[i].querySelector('.custom-checkbox_target').checked){
                    items[i].parentNode.removeChild(items[i]);
                    itemLeft--;
                    countItems--;
                }
            }
            if (countItems === 0){
                document.querySelector('.todos-board').classList.remove('__has-content');
            }
        }

        if (filter.classList.contains('__Completed')){
            for(var i=0;i<items.length;i++){
                if (items[i].querySelector('.custom-checkbox_target').checked){
                    items[i].parentNode.removeChild(items[i]);
                    countItems--;
                }
            }
            if (countItems === 0){
                document.querySelector('.todos-board').classList.remove('__has-content');
            }
        }
        updateCounter();
    });
});


console.log('init');