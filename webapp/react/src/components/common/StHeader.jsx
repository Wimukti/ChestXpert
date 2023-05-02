import React from 'react'
import './styles.css';
import {
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"

class StHeader extends StreamlitComponentBase {
    state = {
        title: '',
        subtitle: '',
    }
    componentDidMount() {
        super.componentDidMount();
        let title = this.props.args["title"];
        let subtitle = this.props.args["subtitle"];
        if (title && subtitle) {
            this.setState({ title: title, subtitle: subtitle})
        }
    }
    render = () => {
        return (
            <div className='header'>
                <div className='container'>
                    <div className='titles-container'>
                        <div className='page-title'>{this.state.title}</div>
                        <div className='page-sub-title'>{this.state.subtitle}</div>
                    </div>
                </div>

            </div>
        )
    }
}

export default withStreamlitConnection(StHeader);