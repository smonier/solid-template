import React from 'react';
import {useServerContext, getNodeProps} from '@jahia/js-server-engine';

export const Faq = () => {
    const {currentNode} = useServerContext();
    const props = getNodeProps(currentNode, ['question', 'answer']);

    return (
        <article className='question faq-item'>
            <header>
                <h4 className='question-title' id={"question-" + currentNode.getIdentifier()}>
                    {props.question}
                </h4>
                <button id={"btn-" + currentNode.getIdentifier()} className='btn toggle-btn'
                        data-target-id={"answer-" + currentNode.getIdentifier()}>
                    <i className="fas fa-eye button-icon"></i>
                </button>
            </header>
            <div id={"answer-" + currentNode.getIdentifier()} className="toggle-div faqContent"
                 dangerouslySetInnerHTML={{__html: props.answer}}/>
        </article>

    );
}

Faq.jahiaComponent = {
    id: 'faq',
    nodeType: 'solidTemplate:faq',
    displayName: 'FAQ Entry',
    componentType: 'view'
}

