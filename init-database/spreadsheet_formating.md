**Spreadsheet formating**

__Title Column__

Case: Lastname and firstname 
Should be: Lastname, firstname 

Case: Lastname, firstname and nobility title
Should be: Lastname, firstname, nobilitytitle 

Case: Lastname, firstname and year
Should be: Lastname,firstname, ,year

__Publisher__ 

Case: Location and company name 
Should be: Location: Company name

__Descriptor__

Case: volume, pagenumber, bookformating + extra info
Should be: Volume; pagenumber; bookformating; everything else
Ex: 8vol; 150pp; 4to; aslkdfaskdfhasfjashfj

Case: pagenumber, bookformating + extra info
Should be: ; pagenumber ;bookformating; everything else
Ex: ; 150pp; 4to; aslkdfaskdfhasfjashfj

Case: bookformating + extrainfo
Should be: ;; bookformating; everything else 
Ex: ;; 4to; aslkdfaskdfhasfjashfj

Case: Extrainfo
Should be: ;;; everything else
Ex: ;;; aslkdfaskdfhasfjashfj

Case: Empty 
Should be: 
Ex:

Case: volume, extra info
Should be: volume; ; ; everything else
Ex: 8vol;;;everything else
