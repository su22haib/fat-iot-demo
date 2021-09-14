import React, { lazy } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow,
    CDropdown,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle,
    CWidgetDropdown,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'

import LEDSwitch from '../Commands/LEDSwitch'

// import TemperatureIn from '../CustomCharts/TemperatureIn copy'
// import TemperatureOut from '../CustomCharts/TemperatureOut'
import LightIn from '../CustomCharts/LightIn'
import LightOut from '../CustomCharts/LightOut'

// import LightInsideWidget from '../widgets/LightInsideWidget'
// import LightOutsideWidget from '../widgets/LightOutsideWidget'

import TempInsideWidget from '../widgets/TempInsideWidget'
import TempOutsideWidget from '../widgets/TempOutsideWidget'
import NodeCountWidget from '../widgets/NodeCountWidget'
import WindowPositionWidget from '../widgets/WindowPositionWidget'
import ManualOverride from '../Commands/ManualOverride'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const moment = require('moment')

const Dashboard = () => {
    return (
        <>
            {/* This section is where all of the widgets go (i.e. line health, alarms, power consumption) */}
            <CRow>
                <CCol sm="4" lg="2">
                    <WindowPositionWidget />
                </CCol>
                <CCol sm="4" lg="2">
                    <TempInsideWidget />
                </CCol>

                <CCol sm="4" lg="2">
                    <TempOutsideWidget />
                </CCol>

                <CCol sm="4" lg="2">
                    <NodeCountWidget />
                </CCol>

                <CCol sm="4" lg="2">
                    <CCard>
                        <CCardBody style={{ verticalAlign: 'middle' }}>
                            <CRow>
                                <CCol>
                                    <h4
                                        id="traffic"
                                        className="card-title mb-0"
                                        style={{ fontSize: '16px', verticalAlign: 'middle' }}
                                    >
                                        Override
                                    </h4>
                                </CCol>

                                <CCol>
                                    <ManualOverride />
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol sm="4" lg="2">
                    <CCard>
                        <CCardBody>
                            <CRow style={{ verticalAlign: 'middle' }}>
                                <CCol sm="6" lg="7">
                                    <h4
                                        id="traffic"
                                        className="card-title mb-0"
                                        style={{ fontSize: '16px', verticalAlign: 'middle' }}
                                    >
                                        Open Window
                                    </h4>
                                </CCol>

                                <CCol>
                                    <LEDSwitch />
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol sm="6" lg="6">
                    <CCard>
                        <CCardBody>
                            <CRow>
                                <CCol sm="5">
                                    <h4 id="traffic" className="card-title mb-0">
                                        Light Intensity Inside
                                    </h4>
                                </CCol>
                                {/*
                                <CCol sm="7" className="d-none d-md-block">
                                    <CButton color="primary" className="float-right">
                                        <CIcon name="cil-cloud-download" />
                                    </CButton>
                                </CCol>
                                */}
                            </CRow>
                            <LightIn />
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol sm="6" lg="6">
                    <CCard>
                        <CCardBody>
                            <CRow>
                                <CCol sm="5">
                                    <h4 id="traffic" className="card-title mb-0">
                                        Light Intensity Outside
                                    </h4>
                                </CCol>
                                {/*
                                <CCol sm="7" className="d-none d-md-block">
                                    <CButton color="primary" className="float-right">
                                        <CIcon name="cil-cloud-download" />
                                    </CButton>
                                </CCol>
                                */}
                            </CRow>
                            <LightOut />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Dashboard
