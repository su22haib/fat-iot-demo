import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
    return (
        <CFooter fixed={false}>
            <div>
                <span className="ml-1" href="http://www.focusappliedtechnologies.com/">
                    Focus Applied Technologies
                </span>
            </div>
        </CFooter>
    )
}

export default React.memo(TheFooter)
