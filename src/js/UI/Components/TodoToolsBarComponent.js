export class TodoToolsBarComponent {
    constructor(root,listItem){
        this._root=root;
        this._listItem=listItem;
        var allButton=this._root.querySelector('.__All');
        allButton.addEventListener('click',()=>this.allButtonAction(allButton));

        var activeButton=this._root.querySelector('.__Active');
        activeButton.addEventListener('click',()=>this.activeButtonAction(activeButton));

        var completedButton=this._root.querySelector('.__Completed');
        completedButton.addEventListener('click',()=>this.completedButtonAction(completedButton));

        var clear = this._root.querySelector('.todos-toolbar_clear-completed');
        clear.addEventListener('click',()=>this.clearCompleted());

    }



    countWatcher(){
        this._count=0;
        var items = this._listItem.querySelectorAll('.todos-list_item');
        for (var i=0;i<items.length;i++){
            if (!items[i].classList.contains('__is-checked')){
                this._count++;
            }
        }
        var message='';
        if (this._count>1){
            message=' items left';
        }else{
            message=' item left';
        }
        if (items.length==0){
            document.querySelector('.todos-board').classList.remove('__has-content');
        }else{
            document.querySelector('.todos-board').classList.add('__has-content');
        }
        this._root.querySelector('.todos-toolbar_unready-counter').textContent=this._count+message;
    }


    allButtonAction(button) {
        this.allNoSelectedExeptButton(button);
        var items=this._listItem.querySelectorAll('.todos-list_item');
        for (var i=0;i<items.length;i++){
            items[i].classList.remove('__is-hidden');
        }
    }

    activeButtonAction(button) {
        this.allNoSelectedExeptButton(button);
        var items=this._listItem.querySelectorAll('.todos-list_item');
        for (var i=0;i<items.length;i++){
            var status = items[i].querySelector('.custom-checkbox_target').checked;
            if (status){
                items[i].classList.add('__is-hidden');
            }else{
                items[i].classList.remove('__is-hidden');
            }
        }

    }

    completedButtonAction(button) {
        this.allNoSelectedExeptButton(button);
        var items=this._listItem.querySelectorAll('.todos-list_item');
        for (var i=0;i<items.length;i++){
            var status = items[i].querySelector('.custom-checkbox_target').checked;
            if (!status){
                items[i].classList.add('__is-hidden');
            }else{
                items[i].classList.remove('__is-hidden');
            }
        }
    }

    allNoSelectedExeptButton(button){
        var filters = this._root.querySelectorAll('.todos-toolbar_filter');
        for (var i=0;i<filters.length;i++){
            filters[i].classList.remove('__selected');
        }
        button.classList.add('__selected');
    }

    clearCompleted() {
        var items=this._listItem.querySelectorAll('.todos-list_item');
        for (var i=0;i<items.length;i++){
            var status = items[i].querySelector('.custom-checkbox_target').checked;
            if (status){
                this._listItem.removeChild(items[i]);
            }
        }
    }
}