import {Component, create} from 'anvoy';
import Row from './row';
import Store from './store';

var startTime;
var lastMeasure;

function clickEvent(el, e) {
    let func;
    let id;
    let val = e.target.value;

    if (val) {
        func = val.func;
        id = val.id;
    } else {
        val = e.target.parentNode.value;
        if (val) {
            func = val.func;
            id = val.id;
        }
    }
    func(id);
}

var startMeasure = function(name) {
    startTime = performance.now();
    lastMeasure = name;
}

var stopMeasure = function() {
    var last = lastMeasure;
    if (lastMeasure) {
        window.setTimeout(function () {
            lastMeasure = null;
            var stop = performance.now();
            var duration = 0;
            console.log(last+" took "+(stop-startTime));
        }, 0);
    }
}

export default class App extends Component {
    willInitialize() {
        this.start = 0;
    }
    getInitialState() {
        return {
            store: new Store()
        };
    }
    printDuration() {
        stopMeasure();
    }
    didUpdate() {
        this.printDuration();
    }
    didMount() {
        this.printDuration();
    }
    run() {
        startMeasure("run");
        this.state.store.run();
        this.setState({store: this.state.store});
    }
    add() {
        startMeasure("add");
        this.state.store.add();
        this.setState({store: this.state.store});
    }
    updateRows() {
        startMeasure("update");
        this.state.store.update();
        this.setState({store: this.state.store});
    }
    select(id) {
        startMeasure("select");
        this.state.store.select(id);
        this.setState({store: this.state.store});
    }
    delete(id) {
        startMeasure("delete");
        this.state.store.delete(id);
        this.setState({store: this.state.store});
    }
    runLots() {
        startMeasure("runLots");
        this.state.store.runLots();
        this.setState({store: this.state.store});
    }
    clear() {
        startMeasure("clear");
        this.state.store.clear();
        this.setState({store: this.state.store});
    }
    swapRows() {
        startMeasure("swapRows");
        this.state.store.swapRows();
        this.setState({store: this.state.store});
    }
    static el() {
        return `
            <div class="container">
                <div class="jumbotron">
                    <div class="row">
                        <div class="col-md-6">
                            <h1>Anvoy</h1>
                        </div>
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-sm-6 smallpad">
                                    <button @run type="button" class="btn btn-primary btn-block" id="run">Create 1,000 rows</button>
                                </div>
                                <div class="col-sm-6 smallpad">
                                    <button @runLots type="button" class="btn btn-primary btn-block" id="runlots">Create 10,000 rows</button>
                                </div>
                                <div class="col-sm-6 smallpad">
                                    <button @add type="button" class="btn btn-primary btn-block" id="add">Append 1,000 rows</button>
                                </div>
                                <div class="col-sm-6 smallpad">
                                    <button @updateRows type="button" class="btn btn-primary btn-block" id="update">Update every 10th row</button>
                                </div>
                                <div class="col-sm-6 smallpad">
                                    <button @clear type="button" class="btn btn-primary btn-block" id="clear">Clear</button>
                                </div>
                                <div class="col-sm-6 smallpad">
                                    <button @swapRows type="button" class="btn btn-primary btn-block" id="swaprows">Swap Rows</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table table-hover table-striped test-data"><tbody @tbody><@rows/></tbody></table>
                <span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
            </div>
        `;
    }

    render(props, state) {
        let onClick = this.select.bind(this);
        let onDelete = this.delete.bind(this);
        let selected = this.state.store.selected;

        return {
            rows: this.state.store.data.map((d, i) => create(Row, {
                data: d,
                onClick,
                onDelete,
                styleClass: d.id === selected ? 'danger' : ''
            })),
            run: {
                onClick: this.run
            },
            runLots: {
                onClick: this.runLots
            },
            add: {
                onClick: this.add
            },
            updateRows: {
                onClick: this.updateRows
            },
            clear: {
                onClick: this.clear
            },
            swapRows: {
                onClick: this.swapRows
            },
            tbody: {
                onClick: clickEvent
            }
        };
    }
}
