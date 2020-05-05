import React from 'react';
import spinner from '../loading.gif';
const h = React.createElement;

function RenderPromise({promise, renderData}) {
   const [data, setData] = React.useState(null);

   React.useEffect(()=>{
        setData(null);
        promise.then(x => setData(x))
           	 	.catch(err => setData({error:err}))
   }, [promise]);

   return data === null &&  h("img", { className: "spinnerClass", src: spinner })
           || data !== null && !data.error && h(renderData, {data})
           || data !== null && data.error && h("div", {}, data.error.toString());
};

export default RenderPromise;
