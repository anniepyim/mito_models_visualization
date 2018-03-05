#!/usr/bin/env python

import cgi, os, re, sys
import cgitb;cgitb.enable()
import json
import pandas as pd
import numpy as np
import pymysql
#import simplejson

form = cgi.FieldStorage()
sampleID = form.getvalue('sampleID')
organism = form.getvalue('organism')
sessionid = form.getvalue('sessionid')
host = form.getvalue('host')
port = form.getvalue('port')
user = form.getvalue('user')
passwd = form.getvalue('passwd')
unix_socket = form.getvalue('unix_socket')

#sampleID = "100hvs90h"
#organism = "Fly"
#sessionid = "test"
#host = "localhost"
#port = "3306"
#user = "root"
#passwd = ""
#unix_socket = "/tmp/mysql.sock"

#connecting to mysql database
conn = pymysql.connect(host=host, port=port, user=user, passwd=passwd, db=organism, unix_socket=unix_socket)
query = 'SELECT target_exp.sampleID, target_exp.gene, target_exp.log2, target_exp.pvalue, target_mut.mutation FROM target_exp LEFT JOIN target_mut ON target_exp.sampleID=target_mut.sampleID AND target_exp.gene=target_mut.gene WHERE target_exp.sampleID="' + sampleID+'" AND target_exp.userID in ("mitox","'+sessionid+'")'
main = pd.read_sql(query, con=conn)
query = 'SELECT gene, process, gene_function from target'
genefunc = pd.read_sql(query, con=conn)
links = pd.read_sql('SELECT * from links', con=conn)
conn.close()

main.fillna('',inplace=True)
main = pd.merge(genefunc,main,on="gene",how='inner')
main = main.to_json(orient='records')
links = links.to_json(orient = 'records')
json_all = [{'nodes' : main, 'links' : links}]
json_all = json.dumps(json_all)


print 'Content-Type: application/json\n\n'
print (json_all)
#print "Content-type: text/html\n"
#print "<html>"
#print main
#print "</html>"