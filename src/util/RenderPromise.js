/* eslint-disable no-mixed-operators */
import React from 'react';
import spinner from '../loading.gif';
const h = React.createElement;

function RenderPromise({promise, renderData, setNull}) {
   const [data, setData] = React.useState(null);

   React.useEffect(()=>{
        if (setNull) {
          setData(null);
        }
        promise.then(x => setData(x))
           	 	.catch(err => setData({error:err}))
   }, [promise, setNull]);

   return data === null &&  h("img", { className: "spinnerClass", src: spinner })
           || data !== null && data !== undefined && !data.error && h(renderData, {data})
           || data !== null && data !== undefined && data.error && h("div", {}, data.error.toString());
};

export default RenderPromise;
