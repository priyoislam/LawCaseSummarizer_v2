console.log(user);
        console.log("this is user ");

        console.log(userCredential);
        console.log(" this is credential full ");

        const _tokenResponse = userCredential._tokenResponse;
       
       
        console.log(_tokenResponse.expiresIn);
        console.log(_tokenResponse.idToken);
        console.log(_tokenResponse.kind);
        console.log(_tokenResponse.localId);
        console.log(_tokenResponse.refreshToken);

        
        const auth=user.email
        console.log(operationType);

       