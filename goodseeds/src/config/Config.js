import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
  "type": "service_account",
  "project_id": "goodseeds-6ae68",
  "private_key_id": "4f22ae3acc9d31a10d76dd32cd274fb8f67d5c82",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDF9WKAONI65lDc\nCE7jzmvsWVx1btxIjsn/DuAz7Syi7Zsv6a3U9/rgCWdutpAYyiZRUFGnueOsqhel\nFWShuS5maQzOPVG95n9T9wVuPjdTGZqE5o8/NHPJ/YijQ3rJJNhG7CKo2mvG7qVt\n9UBza3gDOwZJc6jiWpg9Nh2+TfdEJ1XV01QA+indc97J82kZzC+386r6a5GAj/Pb\nb/mgB3ZZ4Cj33HSxQajngmIJhctXC5JL69WFdJZ6Io6KAJjTCwQyuoM4Mlu2nmc0\nOb8NJML0ig1RgruecLukusI5jXMOSJggHcjD6hC4wtdD7f+KfTFdTWNI2RZ+daMk\nxOPqnd7bAgMBAAECggEASprXO5GukWoZkUNEUBCMle97q/pS5LmDoS9/CbLZ/rFj\nqiP8UmX+045Xv97n4Z/V3xFRJNAm4Pzdmma8nUKIHSp8HAH6G4KR/Bf9oPWrrhLZ\nLDskQ2LGPJrjcvxMex/6rofx7AcdVUS9bfpfBuC6wyTskqQXQu93rqIFhaImjTVI\nHIDC182q2lJRW93ThJuJgymzqGupQcSAXaddH3xUKGBM1sOJbUK8I20wuOvU4ZSq\nRI/4wDkvm100MfBstivhI59x7H3S2Q/L/79eh6dur79RixWTG2fh6t9FxIh7jCz9\n/9pKYBRTjN5B+2iCJ2dBI4lq+3kjLIkbQxDQhbcJ0QKBgQDoZDZRcGF0qqP743+c\ncXBPz3VEO1qJ94HK5pyfJ2Ej4hNAQbsrpPmCEySs+jRGeaxDgtdlzgaP9pIvJQat\nzjdtDkCvx+Ha8nK8KCp2HRrsIo0T1HGQgWB+s0LJvhx1kTx5aTlr/p6LUvsDuRTI\ngyJzI4w9vzi/xTOl2Q+QKuNacwKBgQDaEa2ZuBdpHFQ82A3BC2olTbbO8+R+yckz\nnr+xlsPdkQiw4Cps1E9vGgDw2mkpw6l1hC69LlMxWI1R0Kj2V2WN9uVVkcD/uc85\nVE8RJMutjmDrU3jQeT984DWT15JH8+JrrLNQVucXD/ZLEpdR9RZkWsqqn2bJZzJh\n1RprUsdH+QKBgAP1+UsIDFEtu1/Gr90dvdlOYuRH0rI5SrgHmDHKPQiciNF2jVcg\nF7SU2PItzYhJ+Jqp9zvf+BKqFDHDgsqhkiZEsOuOD5ZovXXhhV+//T57FEZ7P3hE\nDD38li3UFK4YTJyRI45op5EeV/LnS6hjO8oUmAZRZQk3tjqkaXR+lqNrAoGBAJj8\nF/ckoD/cYPiCdju9H01mVN6hWebc92tgbolPBL/3FMrJqNnKpKOD8a8G+woSu1q3\nTfboffK7dgE0yqRvsc5DrKY4Z9a/6zIEBKg5US7EGRhe6f4PYcvgm5XJgVU7Mthp\nQy8UmHCkgRwvwbr8nyXuUAodZAXdgQoDb9JlM2s5AoGAPZcIUkKRmSCpskH1476l\noSLTi9pJcUEhpWpF1jKMXFphgNWBOIwCoAuR9jb5fPglh1tLuPx8vaNCUcoYI86i\ngxOI333GAyUXe4TT3LjmVKlXclqGVSVKWzbucfwp9ujJ/E1wUGGdgfO5Dt3AG3Hv\nsam+91pbs7aWQdCbwANRkSs=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-mvgog@goodseeds-6ae68.iam.gserviceaccount.com",
  "client_id": "113681747850228501166",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mvgog%40goodseeds-6ae68.iam.gserviceaccount.com"
}

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true} )

export default firebase;
