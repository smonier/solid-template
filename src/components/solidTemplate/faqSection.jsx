import React from 'react';
import {useServerContext, getNodeProps, getChildNodes, JRender, JAddContentButtons} from '@jahia/js-server-engine';

export const FaqSection = () => {
    const {currentNode} = useServerContext();
    const props = getNodeProps(currentNode, ['title', 'bannerText']);
    const allChildren = getChildNodes(currentNode);

    return (

        <section className="faq section">

            <div className="container">
                <div>
                    <h1 className="hero-title mt-0">{props.title}</h1>
                    <p className="hero-paragraph">
                        <div dangerouslySetInnerHTML={{__html: props.bannerText}}/>
                    </p>
                    <input type="text" id="searchInput" placeholder="Search FAQs..." className="full-width-input"/>


                </div>
                <section id={"faqSection-" + currentNode.getIdentifier()} className='info'>
                    {allChildren && allChildren.map(function (child, index) {
                        return <JRender path={child.getPath()} key={child.getIdentifier()} parameters={{index}}/>;
                    })}
                    <JAddContentButtons/>
                </section>
            </div>
        </section>
    );
}

FaqSection.jahiaComponent = {
    id: 'faqSection',
    nodeType: 'solidTemplate:faqSection',
    displayName: 'FAQ Section',
    componentType: 'view'
}

