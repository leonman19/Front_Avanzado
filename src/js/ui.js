export const replace = elemento => (removeClass, addClass)=>{
    elemento.classList.remove(removeClass);
    elemento.classList.add(addClass);
};