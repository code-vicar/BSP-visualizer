import { html, render as litRender } from './lit-html.js'
import { rendering } from './render.mjs'

const optionsTemplate = (values) => html`
    <div>
        <span>height</span><br/>
        <input name="height" type="number" value="${values.height}" />
    </div>
    <div>
        <span>width</span><br/>
        <input name="width" type="number" value="${values.width}" />
    </div>
    <div>
        <span>Max Leaf Size</span><br/>
        <input name="MAX_LEAF_SIZE" type="number" value="${values.MAX_LEAF_SIZE}" />
    </div>
    <div>
        <span>Min Leaf Size</span><br/>
        <input name="MIN_LEAF_SIZE" type="number" value="${values.MIN_LEAF_SIZE}" />
    </div>
    <div>
        <span>Skip Split Above Max %</span><br/>
        <input name="SKIP_SPLIT_ABOVE_MAX" type="number" value="${values.SKIP_SPLIT_ABOVE_MAX}" />
    </div>
    <div>
        <span>Skip Split %</span><br/>
        <input name="SKIP_SPLIT" type="number" value="${values.SKIP_SPLIT}" />
    </div>
`;

class MainController {
    constructor() {
        this.state = {
            width: 400,
            height: 400,
            MAX_LEAF_SIZE: 150,
            MIN_LEAF_SIZE: 80,
            SKIP_SPLIT_ABOVE_MAX: 2,
            SKIP_SPLIT: 8
        }
        this.onChange = this.onChange.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.renderMap = this.renderMap.bind(this)
        this.renderingContext = rendering(this.state.width, this.state.height)
        this.renderForm()
        this.renderMap()
    }

    onChange(e) {
        const name = e.target.name
        const value = parseInt(e.target.value, 10)
        this.state[name] = value
        this.renderForm()
    }

    renderForm() {
        const form = document.querySelector('#optionsForm')
        litRender(optionsTemplate(this.state), form)
    }

    renderMap() {
        const {
            width,
            height,
            ...settings
        } = this.state
        // draw the map
        this.renderingContext.renderMap(width, height, settings)
    }

    getView() {
        return this.renderingContext.renderer.view
    }
}



const mainCtrl = new MainController()
// and append it's view to the DOM
const stageElement = document.getElementById('stage')
stageElement.appendChild(mainCtrl.getView())
window.mainCtrl = mainCtrl
