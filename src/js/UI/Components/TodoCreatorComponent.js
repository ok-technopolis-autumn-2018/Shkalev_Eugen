import {Eventable} from "../../lib/Eventable";

export class TodoCreatorComponent extends Eventable {

    /**
     *
     * @param {HTMLElement} root
     */
    constructor(root){
        super();
        this._input=root.querySelector('.todos-creator_text-input');
        root.addEventListener('submit',this);
        var markAllAsDone = root.querySelector('.todos-creator_check-all');
        markAllAsDone.addEventListener('click',this);

    }

    handleEvent(e){
        switch (e.type) {
            case 'submit':
                e.preventDefault();
                this.readAndAddInputText();
                break;
            case 'click':
                this.markAllAsDone();
                break;
        }
    }

    readAndAddInputText() {
        const inputText = this._input.value.trim();
        if (inputText){
            this._input.value='';
            this.trigger('addItem',inputText);
        }
    }

    markAllAsDone() {
        this.trigger('markAllAsDone');
    }
}