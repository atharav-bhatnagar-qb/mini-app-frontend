import React from 'react'

const CreatePageIndicator = ({page}) => {
  return (
    <div className='cj-page-ind'>
        <p className={"cj-num"}>
            1
        </p>
        <div className={(page>1)?"cj-line":"cj-dash"}/>
        <p className={(page>1)?"cj-num":"cj-num2"}>
            2
        </p>
        <div className={(page>2)?"cj-line":"cj-dash"}/>
        <p className={(page>2)?"cj-num":"cj-num2"}>
            3
        </p>
    </div>
  )
}

export default CreatePageIndicator