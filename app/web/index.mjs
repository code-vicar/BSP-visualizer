import { html, render as litRender } from './lit-html.js'
import { rendering } from './render.mjs'

const optionsTemplate = (values) => html`
    <div>
        <span>Map height</span><br/>
        <input name="height" type="number" value="${values.height}" />
    </div>
    <div>
        <span>Map width</span><br/>
        <input name="width" type="number" value="${values.width}" />
    </div>
    <div>
        <span>Minimum room height length</span><br/>
        <input name="minHeight" type="number" value="${values.minHeight}" />
    </div>
    <div>
        <span>Minimum room width length</span><br/>
        <input name="minWidth" type="number" value="${values.minWidth}" />
    </div>
    <div>
        <span>Stop splitting height when below</span><br/>
        <input name="stopHeight" type="number" value="${values.stopHeight}" />
    </div>
    <div>
        <span>Stop splitting width when below</span><br/>
        <input name="stopWidth" type="number" value="${values.stopWidth}" />
    </div>
    <div>
        <span>Skip splitting a room this percentage of times</span><br/>
        <input name="ignoreSplitPercent" type="number" value="${values.ignoreSplitPercent}" />
    </div>
    <div>
        <span>Ignore room height/width stops this percentage of times</span><br/>
        <input name="ignoreStopPercent" type="number" value="${values.ignoreStopPercent}" />
    </div>
`;

class MainController {
    constructor() {
        this.state = {
            width: 400,
            height: 400,
            minHeight: 25,
            stopHeight: 60,
            minWidth: 25,
            stopWidth: 60,
            ignoreSplitPercent: 10,
            ignoreStopPercent: 10
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
