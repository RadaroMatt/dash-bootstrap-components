import React from 'react';
import PropTypes from 'prop-types';
import {Alert as RSAlert} from 'reactstrap';

class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.onDismiss = this.onDismiss.bind(this);

    this.state = {
      alertOpen: props.is_open
    };
  }

  onDismiss() {
    if (this.props.setProps) {
      this.props.setProps({is_open: false});
    } else {
      this.setState({alertOpen: false});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.is_open != this.state.alertOpen) {
      this.setState({alertOpen: nextProps.is_open});
    }
  }

  render() {
    const {
      children,
      dismissable,
      is_open,
      loading_state,
      ...otherProps
    } = this.props;
    return (
      <RSAlert
        isOpen={this.state.alertOpen}
        toggle={dismissable && this.onDismiss}
        {...otherProps}
        data-dash-is-loading={
          (loading_state && loading_state.is_loading) || undefined
        }
      >
        {children}
      </RSAlert>
    );
  }
}

Alert.defaultProps = {
  is_open: true
};

Alert.propTypes = {
  /**
   * The ID of this component, used to identify dash components
   * in callbacks. The ID needs to be unique across all of the
   * components in an app.
   */
  id: PropTypes.string,

  /**
   * The children of this component.
   */
  children: PropTypes.node,

  /**
   * Defines CSS styles which will override styles previously set.
   */
  style: PropTypes.object,

  /**
   * Often used with CSS to style elements with common properties.
   */
  className: PropTypes.string,

  /**
   * A unique identifier for the component, used to improve
   * performance by React.js while rendering components
   * See https://reactjs.org/docs/lists-and-keys.html for more info
   */
  key: PropTypes.string,

  /**
   * Alert color, options: primary, secondary, success, info, warning, danger,
   * link. Default: secondary.
   */
  color: PropTypes.string,

  /**
   * Whether alert is open. Default: True.
   */
  is_open: PropTypes.bool,

  /**
   * If True, a fade animation will be applied when `is_open` is toggled. If
   * False the Alert will simply appear and disappear.
   */
  fade: PropTypes.bool,

  /**
   * If true, add a close button that allows Alert to be dismissed.
   */
  dismissable: PropTypes.bool,

  /**
   * Object that holds the loading state object coming from dash-renderer
   */
  loading_state: PropTypes.shape({
    /**
     * Determines if the component is loading or not
     */
    is_loading: PropTypes.bool,
    /**
     * Holds which property is loading
     */
    prop_name: PropTypes.string,
    /**
     * Holds the name of the component that is loading
     */
    component_name: PropTypes.string
  })
};

export default Alert;
