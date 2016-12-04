import {Component} from 'anvoy';

export default class Row extends Component {
    shouldUpdate(nextProps) {
		    return nextProps.data !== this.props.data || nextProps.styleClass !== this.props.styleClass;
    }
    handleSelect() {
        this.props.onClick(this.props.data.id);
    }
    handleDelete() {
        this.props.onDelete(this.props.data.id);
    }
    static el() {
        return  `
            <tr>
                <td @id class="col-md-1"></td>
                <td class="col-md-4">
                    <a @label></a>
                </td>
                <td class="col-md-1">
                    <a @delete>
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </a>
                </td>
                <td class="col-md-6"></td>
            </tr>
        `;
    }
    render(props, state) {
        return {
            root: {
                class: props.styleClass
            },
            id: {
                text: props.data.id
            },
            label: {
                text: props.data.label,
                defaultValue: {func: this.props.onClick, id: props.data.id}
                //onClick: this.handleSelect
            },
            delete: {
                defaultValue: {func: this.props.onDelete, id: props.data.id}
                //onClick: this.handleDelete
            }
        };
    }
}
