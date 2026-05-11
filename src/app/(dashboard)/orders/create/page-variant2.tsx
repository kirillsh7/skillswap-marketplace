// export const metadata = {
//   title: 'Create order',
// }

// export default function CreateOrderPage() {
//   return (
//     <div className='flex flex-1 pt-16'>
//       {/* <!-- SideNavBar --> */}
//       <aside className='hidden lg:flex flex-col fixed left-0 top-16 h-[calc(100vh-64px)] w-64 p-4 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800'>
//         <div className='mb-8 flex items-center gap-3 px-4'>
//           <img
//             alt='User profile'
//             className='w-10 h-10 rounded-full'
//             data-alt='Portrait of a smiling young man in a casual shirt, blurred outdoor background'
//             src='https://lh3.googleusercontent.com/aida-public/AB6AXuCLgF85VgF87wcdyz8sARNl3z9_OwEAazCiADdeyKO-wXy_u8sHY8na7e4GzuugJ84P7CCNiZQ3CqotQ06C8hBhvnJx8KQtdD7l5RtxK7rUAKvUUnGu2k-_dWkZJC9VBwhG-FcsNt9ahDwdEkY93pa6aZS7-Z_Ynvd-fuFcEGf0YkzEcS9aOydO-6C9i3p669gmLYPpikvghPrP6lICkkOhULiEVfsr4kEa3wi42Wxt95ssxmDvjqwsN9cf0rzuJIn5wp20xaDnYCoP'
//           />
//           <div>
//             <h3 className='text-sm font-bold text-slate-900 dark:text-white'>Alex Rivers</h3>
//             <p className='text-xs text-slate-500'>Verified Merchant</p>
//           </div>
//         </div>
//         <button className='mb-6 w-full py-2 gradient-primary text-on-primary rounded-full text-sm font-semibold active:scale-95 duration-150 shadow-sm'>
//           New Listing
//         </button>
//         <nav className='flex-1 flex flex-col gap-2 text-sm font-semibold'>
//           <a
//             className='flex items-center gap-3 text-slate-600 dark:text-slate-400 px-4 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-all'
//             href='#'
//           >
//             <span
//               className='material-symbols-outlined'
//               data-icon='dashboard'
//             >
//               dashboard
//             </span>{' '}
//             Dashboard
//           </a>
//           <a
//             className='flex items-center gap-3 text-slate-600 dark:text-slate-400 px-4 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-all'
//             href='#'
//           >
//             <span
//               className='material-symbols-outlined'
//               data-icon='handyman'
//             >
//               handyman
//             </span>{' '}
//             My Services
//           </a>
//           <a
//             className='flex items-center gap-3 text-slate-600 dark:text-slate-400 px-4 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-all'
//             href='#'
//           >
//             <span
//               className='material-symbols-outlined'
//               data-icon='verified_user'
//             >
//               verified_user
//             </span>{' '}
//             Escrow Status
//           </a>
//           <a
//             className='flex items-center gap-3 text-slate-600 dark:text-slate-400 px-4 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-all'
//             href='#'
//           >
//             <span
//               className='material-symbols-outlined'
//               data-icon='chat'
//             >
//               chat
//             </span>{' '}
//             Messages
//           </a>
//           <a
//             className='flex items-center gap-3 text-slate-600 dark:text-slate-400 px-4 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-all'
//             href='#'
//           >
//             <span
//               className='material-symbols-outlined'
//               data-icon='settings'
//             >
//               settings
//             </span>{' '}
//             Settings
//           </a>
//         </nav>
//         <div className='mt-auto'>
//           <a
//             className='flex items-center gap-3 text-slate-600 dark:text-slate-400 px-4 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-all text-sm font-semibold'
//             href='#'
//           >
//             <span
//               className='material-symbols-outlined'
//               data-icon='help'
//             >
//               help
//             </span>{' '}
//             Help Center
//           </a>
//         </div>
//       </aside>
//       {/* <!-- Main Content Canvas --> */}
//       <main className='flex-1 lg:ml-64 p-6 lg:p-12 pb-24 overflow-y-auto'>
//         <header className='mb-10 max-w-5xl mx-auto'>
//           <p className='text-sm font-semibold text-primary mb-2 uppercase tracking-wider'>
//             New Contract
//           </p>
//           <h1 className='text-[2.75rem] font-headline font-bold leading-tight tracking-[-0.02em] text-on-surface'>
//             Secure Order Creation
//           </h1>
//           <p className='text-on-surface-variant mt-3 text-lg max-w-2xl'>
//             Define terms, set milestones, and secure funds in escrow before work begins.
//           </p>
//         </header>
//         <div className='max-w-5xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8'>
//           {/* <!-- Left Column: Form & Escrow Settings --> */}
//           <div className='xl:col-span-8 flex flex-col gap-6'>
//             {/* <!-- Basic Details Container --> */}
//             <section className='bg-surface-container-low rounded-xl p-8 pt-10'>
//               <h2 className='text-xl font-bold mb-6 text-on-surface'>Service Details</h2>
//               <div className='space-y-6'>
//                 <div>
//                   <label className='block text-sm font-medium text-on-surface-variant mb-2'>
//                     Project Title
//                   </label>
//                   <input
//                     className='w-full bg-surface-container-highest rounded-lg px-4 py-3 text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-surface-tint/30 transition-all'
//                     placeholder='e.g. Complete Website Redesign'
//                     type='text'
//                   />
//                 </div>
//                 <div>
//                   <label className='block text-sm font-medium text-on-surface-variant mb-2'>
//                     Scope of Work
//                   </label>
//                   <textarea
//                     className='w-full bg-surface-container-highest rounded-lg px-4 py-3 text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-surface-tint/30 transition-all resize-none'
//                     placeholder='Describe the deliverables in detail...'
//                     rows={4}
//                   ></textarea>
//                 </div>
//                 <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-4'>
//                   <div>
//                     <label className='block text-sm font-medium text-on-surface-variant mb-2'>
//                       Expected Delivery Date
//                     </label>
//                     <div className='relative'>
//                       <span
//                         className='material-symbols-outlined absolute left-3 top-3 text-on-surface-variant'
//                         data-icon='calendar_today'
//                       >
//                         calendar_today
//                       </span>
//                       <input
//                         className='w-full bg-surface-container-highest rounded-lg pl-10 pr-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/30 transition-all'
//                         type='date'
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className='block text-sm font-medium text-on-surface-variant mb-2'>
//                       Provider
//                     </label>
//                     <div className='flex items-center gap-3 bg-surface-container-highest rounded-lg px-4 py-2 h-full'>
//                       <img
//                         alt='Provider Avatar'
//                         className='w-8 h-8 rounded-full'
//                         data-alt='Professional headshot of a confident woman with glasses in an office setting'
//                         src='https://lh3.googleusercontent.com/aida-public/AB6AXuDZxZUGWW2bNeaxQzxqXAl-_-mvPNe2TZD-_5F4Pzu7rgy22dJhr1dBn_a6OY8cayJAsBDvtMob42DnOV2jtO2uELz4Gvpk61-T_Xfdra4Ak8g0ZbAzD4N86z6rFPQ8cNksk0oJyz-TibB0Wsp1Wk2I6JeEHwzjZXGkBStOw2U8j-7Ma933-vw1eR_4GFEYEi9XlJ5GdaGJsbY8jVoftUv9nXGp7VJZvTPi8g_zlU9b7YpM2We1bp2HCs8OA4fM5JIU5Z_P6Ei7vlnY'
//                       />
//                       <span className='text-sm font-medium'>Sarah Jenkins</span>
//                       <span
//                         className='material-symbols-outlined ml-auto text-secondary text-sm'
//                         data-icon='verified'
//                       >
//                         verified
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>
//             {/* <!-- Financial Innovation Block --> */}
//             <section className='bg-surface-container-low rounded-xl p-8 pt-10'>
//               <div className='flex items-center gap-3 mb-6'>
//                 <span
//                   className='material-symbols-outlined text-primary text-2xl'
//                   data-icon='account_balance'
//                 >
//                   account_balance
//                 </span>
//                 <h2 className='text-xl font-bold text-on-surface'>Escrow Terms &amp; Payment</h2>
//               </div>
//               {/* <!-- Payment Type Selector --> */}
//               <div className='mb-8'>
//                 <label className='block text-sm font-medium text-on-surface-variant mb-4'>
//                   Payment Structure
//                 </label>
//                 <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
//                   {/* <!-- Active Option --> */}
//                   <label className='cursor-pointer'>
//                     <input
//                       // checked={}
//                       className='peer sr-only'
//                       name='payment_type'
//                       type='radio'
//                     />
//                     <div className='bg-surface-container-lowest border-2 border-primary rounded-lg p-4 transition-all relative overflow-hidden group'>
//                       <div className='absolute top-0 right-0 w-8 h-8 bg-primary rounded-bl-lg flex items-center justify-center'>
//                         <span
//                           className='material-symbols-outlined text-white text-sm font-bold'
//                           data-icon='check'
//                         >
//                           check
//                         </span>
//                       </div>
//                       <span
//                         className='material-symbols-outlined text-primary mb-2 block'
//                         data-icon='flag'
//                       >
//                         flag
//                       </span>
//                       <h4 className='font-bold text-on-surface text-sm mb-1'>Result-Based</h4>
//                       <p className='text-xs text-on-surface-variant'>Pay upon milestone approval</p>
//                     </div>
//                   </label>
//                   {/* <!-- Inactive Options --> */}
//                   <label className='cursor-pointer'>
//                     <input
//                       className='peer sr-only'
//                       name='payment_type'
//                       type='radio'
//                     />
//                     <div className='bg-surface-container-highest border-2 border-transparent rounded-lg p-4 hover:bg-surface-container-low transition-all'>
//                       <span
//                         className='material-symbols-outlined text-on-surface-variant mb-2 block'
//                         data-icon='schedule'
//                       >
//                         schedule
//                       </span>
//                       <h4 className='font-bold text-on-surface text-sm mb-1'>Hourly</h4>
//                       <p className='text-xs text-on-surface-variant'>Tracked via time app</p>
//                     </div>
//                   </label>
//                   <label className='cursor-pointer'>
//                     <input
//                       className='peer sr-only'
//                       name='payment_type'
//                       type='radio'
//                     />
//                     <div className='bg-surface-container-highest border-2 border-transparent rounded-lg p-4 hover:bg-surface-container-low transition-all'>
//                       <span
//                         className='material-symbols-outlined text-on-surface-variant mb-2 block'
//                         data-icon='payments'
//                       >
//                         payments
//                       </span>
//                       <h4 className='font-bold text-on-surface text-sm mb-1'>Advance</h4>
//                       <p className='text-xs text-on-surface-variant'>100% upfront (High Risk)</p>
//                     </div>
//                   </label>
//                 </div>
//               </div>
//               {/* <!-- Amount & Auto-Payout Triggers --> */}
//               <div className='bg-surface-container-lowest rounded-lg p-6 mb-8'>
//                 <div className='flex flex-col md:flex-row gap-8 items-start md:items-center'>
//                   <div className='flex-1 w-full'>
//                     <label className='block text-sm font-medium text-on-surface-variant mb-2'>
//                       Agreed Amount (USD)
//                     </label>
//                     <div className='relative'>
//                       <span className='absolute left-4 top-3 font-bold text-on-surface text-lg'>
//                         $
//                       </span>
//                       <input
//                         className='w-full bg-surface-container-highest rounded-lg pl-8 pr-4 py-3 text-lg font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/30 transition-all'
//                         type='number'
//                       />
//                     </div>
//                   </div>
//                   <div className='hidden md:block h-12 w-px bg-outline-variant/30'></div>
//                   <div className='flex-1 w-full'>
//                     <label className='block text-sm font-medium text-on-surface-variant mb-2'>
//                       Auto-Release Trigger
//                     </label>
//                     <select className='w-full bg-surface-container-highest rounded-lg px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/30 transition-all appearance-none cursor-pointer'>
//                       <option value='manual'>Manual All OK Mark</option>
//                       <option value='gps'>GPS Location Verified</option>
//                       <option value='time'>7 Days Post-Delivery</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               {/* <!-- Insurance Toggle --> */}
//               <div className='flex items-center justify-between p-4 rounded-lg bg-surface-container-highest'>
//                 <div className='flex items-center gap-3'>
//                   <span
//                     className='material-symbols-outlined text-primary'
//                     data-icon='gpp_good'
//                   >
//                     gpp_good
//                   </span>
//                   <div>
//                     <h4 className='text-sm font-bold text-on-surface'>MarketPulse Protection</h4>
//                     <p className='text-xs text-on-surface-variant mt-0.5'>
//                       +3% fee for dispute resolution &amp; refund guarantee
//                     </p>
//                   </div>
//                 </div>
//                 <label className='relative inline-flex items-center cursor-pointer'>
//                   <input
//                     // checked={}
//                     className='sr-only peer'
//                     type='checkbox'
//                     value=''
//                   />
//                   <div className="w-11 h-6 bg-outline-variant/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
//                 </label>
//               </div>
//             </section>
//           </div>
//           {/* <!-- Right Column: Cost Summary & Chat --> */}
//           <div className='xl:col-span-4 flex flex-col gap-6'>
//             {/* <!-- Cost Summary Card --> */}
//             <div className='bg-surface-container-lowest rounded-xl p-6 shadow-sm sticky top-24 z-10'>
//               <h3 className='text-sm font-bold text-on-surface mb-4 uppercase tracking-wide'>
//                 Escrow Summary
//               </h3>
//               <div className='space-y-3 mb-6'>
//                 <div className='flex justify-between text-sm'>
//                   <span className='text-on-surface-variant'>Subtotal</span>
//                   <span className='font-medium'>$1,250.00</span>
//                 </div>
//                 <div className='flex justify-between text-sm'>
//                   <span className='text-on-surface-variant flex items-center gap-1'>
//                     Platform Fee (2%){' '}
//                     <span
//                       className='material-symbols-outlined text-[14px] cursor-help'
//                       data-icon='info'
//                     >
//                       info
//                     </span>
//                   </span>
//                   <span className='font-medium'>$25.00</span>
//                 </div>
//                 <div className='flex justify-between text-sm'>
//                   <span className='text-on-surface-variant text-primary font-medium'>
//                     Protection (+3%)
//                   </span>
//                   <span className='font-medium text-primary'>$37.50</span>
//                 </div>
//               </div>
//               <div className='pt-4 border-t border-outline-variant/20 mb-8'>
//                 <div className='flex justify-between items-baseline'>
//                   <span className='text-sm font-bold text-on-surface'>Total to Escrow</span>
//                   <span className='text-2xl font-black text-on-surface tracking-tight'>
//                     $1,312.50
//                   </span>
//                 </div>
//                 <div className='mt-3 bg-secondary-container rounded p-2 flex items-center justify-center gap-2'>
//                   <span
//                     className='material-symbols-outlined text-on-secondary-container text-sm'
//                     data-icon='lock'
//                   >
//                     lock
//                   </span>
//                   <span className='text-xs font-bold text-on-secondary-container'>
//                     Funds held securely until approval
//                   </span>
//                 </div>
//               </div>
//               <button className='w-full py-4 gradient-primary text-on-primary rounded-full font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-[0_8px_20px_-8px_rgba(0,61,155,0.4)]'>
//                 Fund Escrow &amp; Create Order
//               </button>
//             </div>
//             {/* <!-- Negotiation Chat Snippet (Glassmorphism concept) --> */}
//             <div className='glass-panel rounded-xl p-5 border border-white/20 mt-auto'>
//               <div className='flex items-center gap-2 mb-4 border-b border-white/20 pb-2'>
//                 <span
//                   className='material-symbols-outlined text-primary text-sm'
//                   data-icon='forum'
//                 >
//                   forum
//                 </span>
//                 <h4 className='text-xs font-bold text-on-surface'>Live Negotiation</h4>
//               </div>
//               <div className='space-y-3 mb-4 text-xs'>
//                 <div className='flex gap-2'>
//                   <img
//                     alt='Sarah'
//                     className='w-6 h-6 rounded-full self-end'
//                     data-alt='Tiny circular avatar of a woman with glasses'
//                     src='https://lh3.googleusercontent.com/aida-public/AB6AXuC13IT_wKDEqb-FaAAQ8qbbgb4_opyEo65_6_VfgdI7MSiAIYzjHW3d90YSMKZ_xFnLsyM0ea88BT_O1z_a5FzkEL0zVhc2b_-llvFWgN9QYBnJHzcloBDQ1BtV0b0ZtQySkbrSOwuGYj-cyXizX-cmm7lcGJapfr-AgnAc99k00rL_jhXuB48wb6MfWwEUKIkCcfgFyaf3x5TUmBEx1aUs7Q7meJ0WaPy8mJPx7X80_f6LrcFM6YqgbihTua9eYD3i417SN4GsYqwK'
//                   />
//                   <div className='bg-surface-container-lowest p-2 rounded-lg rounded-bl-none shadow-sm max-w-[80%]'>
//                     <p className='text-on-surface'>
//                       I can do it for $1250 if we use the Result-Based structure.
//                     </p>
//                   </div>
//                 </div>
//                 <div className='flex gap-2 flex-row-reverse'>
//                   <div className='bg-primary-container p-2 rounded-lg rounded-br-none shadow-sm max-w-[80%] text-on-primary-container'>
//                     <p>Agreed. I'll draft the order now.</p>
//                   </div>
//                 </div>
//               </div>
//               <div className='relative'>
//                 <input
//                   className='w-full bg-white/50 backdrop-blur-sm rounded-full py-2 pl-4 pr-10 text-xs border-none focus:ring-1 focus:ring-primary/50 placeholder-on-surface-variant'
//                   placeholder='Message Sarah...'
//                   type='text'
//                 />
//                 <button className='absolute right-2 top-1.5 text-primary hover:text-primary/80'>
//                   <span
//                     className='material-symbols-outlined text-lg'
//                     data-icon='send'
//                   >
//                     send
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }
