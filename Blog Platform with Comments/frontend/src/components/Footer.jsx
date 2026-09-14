

const Footer = () => {
  return (
    <>
<div className="mt-16 w-full bg-[#20362e] px-8 py-10 text-sm text-[#dce8dc] md:flex-row md:justify-between md:px-[200px] ">
       <div className="flex flex-col text-white">
         <p className="mb-3 font-serif text-xl text-white">Inkline.</p>
         <p>Ideas worth lingering on.</p>
       </div>

       <div className="flex flex-col text-white">
         <p>Stories</p>
         <p>Conversations</p>
         <p>About</p>
       </div>

       <div className="flex flex-col text-white">
         <p>Built for thoughtful readers.</p>
       </div>
    </div>
    <p className="bg-[#20362e] py-2 pb-6 text-center text-sm text-[#9eb5a2]">© 2026 Inkline. Read, respond, repeat.</p>
    </>
    
  )
}

export default Footer