import React, { useEffect } from 'react';

function useHanlderClickOutSide(ref:any, funcHanlder:()=>void) {
	useEffect(() => {
		function hanlderClickOutSide(event:any) {
			if (ref.current && !ref.current.contains(event.target)) {
				funcHanlder();
			}
		}
		document.addEventListener('mousedown', hanlderClickOutSide);
		return () => {
			document.removeEventListener('mousedown', hanlderClickOutSide);
		};
	}, [ref, funcHanlder]);
}
export default useHanlderClickOutSide;
