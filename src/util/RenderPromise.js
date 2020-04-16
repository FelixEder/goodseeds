import React from 'react';
const h = React.createElement;

function RenderPromise({promise, renderData}) {
   const [data, setData] = React.useState(null);

   React.useEffect(()=>{
        promise.then(x => setData(x))
           	 	.catch(err => setData({error:err}))
   }, [promise]);

   return data === null
           || data !== null && !data.error && h(renderData, {data})
           || data !== null && data.error && h("div", {}, data.error.toString());
};

export default RenderPromise;
