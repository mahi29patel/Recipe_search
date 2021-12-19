const Timeline = ({ directions }) => {
    return (
        < section class="text-gray-600 body-font" >
            <div class="container  mx-auto flex flex-wrap">

                {
                    directions && directions.map((direction, iteration) => <div class="flex relative mt-3 sm:items-center w-full mx-auto">
                        <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
                            <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                        </div>
                        <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-blue-500 text-white relative z-10 title-font font-medium text-sm">*</div>
                        <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                            <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
                                <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">{`Step ${iteration + 1}`}</h2>
                                <p class="leading-relaxed">{direction}</p>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </section >

    );
}

export default Timeline;