function geneRegulation(log2Limit, pvalLimit){

    log2Limit = (log2Limit !== undefined) ? log2Limit :  1.5;
    pvalLimit = (pvalLimit !== undefined) ? pvalLimit :  0.05;

    function isUpRegulated(g){
        return g.log2 > log2Limit || (g.log2 > 0 && g.pvalue < 0.05);
    }

    function isDownRegulated(g){
        return g.log2 < - log2Limit || (g.log2 < 0 && g.pvalue < 0.05);
    }

    function isNotRegulated(g){
         return !isUpRegulated(g) && !isDownRegulated(g);
    }
    
    function isRegulated(g){
         return isUpRegulated(g) || isDownRegulated(g);
    }
    
    function getRegulation(g){
        
        if(isUpRegulated(g)) return 'up';
        
        if(isUpRegulated(g)) return 'down';
        
        return 'none';
    }
    
    return {
        isUpRegulated : isUpRegulated,
        isDownRegulated : isDownRegulated,
        isNotRegulated : isNotRegulated,
        isRegulated : isRegulated,
        getRegulation : getRegulation,
    };
}

module.exports = geneRegulation;