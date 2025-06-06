import React from 'react';
import MenuOptions from '../components/menuOptions';
import TopHeader from '../components/TopHeader';
import '../CssComponents/AboutAISC.css'
import LoginFooter from '../components/Login-footer';

const AboutAISC = () => {
    return (
        <div>
            <div className='sticky top-0 z-50'>
                <TopHeader />

            </div>
            <MenuOptions />
            <div style={{ padding: '24px 16px' }} className="flex flex-col gap-6">
                {[
                    {
                        title: "About Abeda Inamdar Senior College",
                        img: "https://i.ytimg.com/vi/je8KL8XuSTs/hqdefault.jpg",
                        desc: `The Abeda Inamdar Senior College is one of the institutions established and governed by The Maharashtra Cosmopolitan Education Society (M.C.E. Society). The M.C.E. Society, was established in the year 1948 by Late Mr. Abdul Kadir Khan and likeminded educationists, with an objective of providing education to the economically, educationally and socially weaker sections of the society. `,
                        button: "Read More",
                    },
                    {
                        title: "About M.C.E. Society",
                        img: "https://i.ytimg.com/vi/je8KL8XuSTs/hqdefault.jpg",
                        desc: `Maharashtra Cosmopolitan Education Society (MCES), was established in the year 1948 by Late Mr.Abdul Kadir Khan and others...`,
                        button: "Read More",
                    },
                    {
                        title: "DR. P. A. INAMDAR President (M.C.E. Society)",
                        img: "https://www.abedainamdarcollege.org.in/assets/images/services/bg-1.jpg",
                        desc: `The Global economic scenario is changing rapidly. Thus the industries need trained personnel who can innovate rather than just follow others. I strongly believe that if the right kind of soft skills, Communication and language skills and computer knowledge are imparted to the students, there is no doubt that they will be able to not only lead the community but also develop a strong nation .`,
                        button: "Introductory Video",
                    },
                    {
                        title: "MRS. ABEDA INAMDAR",
                        subtitle: "Founder Abeda Inamdar Senior College",
                        img: "https://www.abedainamdarcollege.org.in/assets/images/services/bg-2.jpg",
                        desc: `She has keen interest in Education, particularly Women’s Education...`,
                        button: "Read More",
                    },
                    {
                        title: "PROF.(DR) SHAILA BOOTWALA",
                        subtitle: "Principal (Abeda Inamdar Senior College)",
                        img: "https://www.abedainamdarcollege.org.in/assets/images/services/bg-3.jpg",
                        desc: `We at M.C.E. Society's Abeda Inamdar Senior College believe in the philosophy 'to educate is to empower'...`,
                        button: "Read More",
                    },
                ].map((item, idx) => (
                    <div
                        key={idx}
                        style={{ marginBottom: '24px', padding: '16px' }}
                        className="flex flex-col lg:flex-row items-center justify-between bg-gray-100 rounded-lg overflow-hidden shadow-md"
                    >
                        <div style={{ height: '256px' }} className="w-full lg:w-[30%] lg:h-72">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div style={{ paddingLeft: '16px', paddingRight: '16px' }} className="flex flex-col gap-4 w-full lg:w-[70%]">
                            <h1 className="text-xl font-bold uppercase">{item.title}</h1>
                            {item.subtitle && (
                                <h2 className="text-sm text-center font-semibold text-black">{item.subtitle}</h2>
                            )}
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                            <button style={{padding:'0.3rem'}} className="bg-blue-900 rounded text-white font-light px-4 py-1 w-fit hover:bg-blue-800 transition">
                                {item.button}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <LoginFooter ></LoginFooter>
        </div>
    );
};

export default AboutAISC;