import 'core-js/stable';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import './style.scss';

function render() {
  ReactDOM.render(
    <Router />,
    document.getElementById('root'),
  );
}

$(() => {
  render();
});
