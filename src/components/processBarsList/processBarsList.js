import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Processbars from '../processBars';
import { TimelineLite, Power2 } from 'gsap';
import classnames from 'classnames';
import './processBarsList.css';

class ProcessBarsList extends Component {
  static propTypes = {
    processbars: PropTypes.array.isRequired,
    visibleArr: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      componentRenderCount: 0
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.componentRenderCount <= nextProps.visibleArr.length + 2) {
      return true;
    }

    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.visibleArr.includes(true) &&
      this.state.componentRenderCount <= nextProps.visibleArr.length + 2
    ) {
      let cnt = this.state.componentRenderCount;
      cnt++;
      this.setState((prevState, props) => {
        return { componentRenderCount: cnt };
      });
    }
  }

  renderRows() {
    const { processbars, visibleArr } = this.props;
    if (visibleArr[0]) {
      this.animateTitle(this.refs.title.children[0]);
    }

    return processbars.map((processbar, i) => {
      return (
        <div key={'processbarlist-row' + i}>
          <div
            className={classnames(
              'onscroll-reveal processbars',
              'processbar' + i
            )}
          >
            {visibleArr[i]
              ? <Processbars
                  height={20}
                  data={processbar.items}
                  id={i}
                  title={processbar.title}
                />
              : null}
          </div>
        </div>
      );
    });
  }

  /**
   * Animates section title
   */
  animateTitle(title) {
    const tl = new TimelineLite();
    tl.set(title, { rotationX: -45 }).to(
      title,
      1.5,
      {
        y: '0%',
        opacity: 1,
        transformOrigin: '0 50%',
        rotationX: 0,
        ease: Power2.easeOut
      },
      0.5
    );
  }

  render() {
    const { title } = this.props;

    return (
      <div>
        <h1 className="name visible relative" ref="title">
          <span>{title}</span>
        </h1>
        <div className="processbars-list-container">{this.renderRows()}</div>
      </div>
    );
  }
}

export default ProcessBarsList;
