#!/usr/bin/python

import cgi, os, re, sys
import cgitb;cgitb.enable()
import json
import pandas as pd
import sys

#Read in files
sampleID = sys.argv[1]
exp = pd.read_csv(sys.argv[2],sep="\t",usecols=[0,1,2,3,4])
mut = pd.read_csv(sys.argv[3],sep="\t",usecols=[0,1,2,3,4,5,6])


#Set index to gene for easy merging
gene_function.columns = ['gene','process','chr','gene_function','EMBL_ID']
exp.columns = ['gene','Normal','Abnormal','log2','pvalue']
mut.columns = ['gene','chr','position','ref','alt','effect','consequence']

mut['mutation'] = mut['chr'].astype(str)+ ' ' + mut['position'].astype(str) + ' ' + mut['ref'] + '|' + mut['alt'] + ': ' + mut['effect'] + ': ' + mut['consequence']
mut = mut[['gene','mutation']]
mut = mut.groupby('gene').apply(lambda x: '; '.join(x.mutation)).reset_index()
mut.columns=['gene','mutation']

merged = pd.merge(gene_function, exp, on=['gene'], how="inner")
merged = pd.merge(merged, mut, on=['gene'], how="left")

merged['mutation'].fillna(value="",inplace=True)
merged.fillna(value="NA",inplace=True)
merged['sampleID'] = sampleID

outputname = sampleID + '.json'
outputpath = "../data/user_uploads/" + sessionid + "/json/" + outputname

merged.to_json(outputpath,orient='records')

print(outputpath)