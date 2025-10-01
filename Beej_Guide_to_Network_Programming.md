# Beej's Guide to Network Programming

## Two Types of Internet Sockets
Steam Sockets
- reliable two way connected communication stream. Messge arrives in order & Error-free
- used for telnet, ssh applications and with HTTP to get pages
- use Transmittion control Protocol (TCP) [RFC 793-10](https://datatracker.ietf.org/doc/html/rfc793)

Datagram Sockets
- connectionless, you dont have to maintain an open connection
- if you send a datagram it may arrive out of order, but if it arrives it does so error free
- used for video, audio streaming, multiplayer games, tftp (trivial file transfer protocol), and dhcpcd
- use User Datagram Protocol (UDP) [RFC 768-12](https://datatracker.ietf.org/doc/html/rfc768)

## Low level Nonsense and Network Theory
Layered Network Model (OSI)
- a Network Model developed by ISO to standardize telecommunication into distrinct layers

Encapsulation
- act of addign headers and trailers to data as it moves through the layers of OSI model

OSI Layers
- network
- presentation
- session
- transport
- network
- data link
- physical

OSI Model that matter
- application Layer (telnet, ftp, etc.)
- host-to-Host Transport Layer (TCP, UDP)
- internet Layer (IP and routing)
- network Access Layer (Ethernet, wi-fi, or whatever)

# IP Addresses, structs, and Data Munging


  
